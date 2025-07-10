import { useEffect, useState, useMemo } from "react";
import Tree from "react-d3-tree";
import { useNavigate } from "react-router-dom";
import { competenciaService } from "../../../services/competenciaService";
import { getArbolCompetencia } from "../../../services/arbolCompetenciaService";

// Paleta de colores
const palette = [
  "#4caf50", "#2196f3", "#ffeb3b", "#ff9800", "#e91e63",
  "#9c27b0", "#795548", "#607d8b", "#f44336"
];

// Hook para mapear pesos a colores
function usePesoColorMap(arbol) {
  return useMemo(() => {
    if (!arbol || !arbol[0] || !arbol[0].children) return {};

    function recolectarPesos(nodos, set = new Set()) {
      nodos.forEach(n => {
        if (typeof n.peso === "number") set.add(n.peso);
        if (n.children) recolectarPesos(n.children, set);
      });
      return set;
    }

    const pesos = Array.from(recolectarPesos(arbol));
    const uniquePesos = pesos.sort((a, b) => b - a);
    const map = {};
    uniquePesos.forEach((peso, idx) => {
      map[peso] = palette[idx % palette.length];
    });
    return map;
  }, [arbol]);
}

// Transforma los datos en árbol jerárquico por pesos
function transformarArbol(data) {
  if (!data || !data.componentes || data.componentes.length === 0) return [];

  // Agrupar componentes por peso
  const porPeso = {};
  data.componentes.forEach(comp => {
    if (!porPeso[comp.peso]) porPeso[comp.peso] = [];
    porPeso[comp.peso].push(comp);
  });

  // Ordenar pesos de mayor a menor
  const pesosOrdenados = Object.keys(porPeso)
    .map(p => parseInt(p))
    .sort((a, b) => b - a);

  // Crear nodos por nivel
  const niveles = pesosOrdenados.map(peso => {
    return porPeso[peso].map(comp => ({
      name: comp.descripcion,
      peso: comp.peso,
    }));
  });

  // Conectar jerárquicamente
  for (let i = 0; i < niveles.length - 1; i++) {
    const padre = niveles[i][0];
    if (!padre.children) padre.children = [];
    padre.children = padre.children.concat(niveles[i + 1]);
  }

  return [
    {
      name: data.nombre,
      children: niveles.length > 0 ? niveles[0] : [],
    }
  ];
}

export default function VisualizarArbol() {
  const [competencias, setCompetencias] = useState([]);
  const [competenciaId, setCompetenciaId] = useState("");
  const [arbol, setArbol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    competenciaService.getCompetencias()
      .then(setCompetencias)
      .catch(() => setError("Error al cargar competencias"));
  }, []);

  useEffect(() => {
    if (!competenciaId) {
      setArbol(null);
      return;
    }
    setLoading(true);
    getArbolCompetencia(competenciaId)
      .then(data => setArbol(transformarArbol(data)))
      .catch(() => setError("Error al cargar el árbol"))
      .finally(() => setLoading(false));
  }, [competenciaId]);

  const pesoColorMap = usePesoColorMap(arbol);

function renderCustomNode({ nodeDatum, hierarchyPointNode }) {
  const isRoot = hierarchyPointNode.depth === 0;
  const peso = nodeDatum.peso ?? null;

  let color = "#000000"; // color por defecto
  if (!isRoot && peso !== null && pesoColorMap[peso]) {
    color = pesoColorMap[peso];
  }

  return (
    <g>
      <circle r={30} fill={color} stroke="#333" strokeWidth={1} />
      <text
        textAnchor="middle"
        y={-60}
        fontSize="14"
        fill="#000"
        fontFamily="sans-serif"
      >
        {nodeDatum.name}
      </text>

      {/* Peso */}
      {peso !== null && (
        <text
          textAnchor="middle"
          y={-40}
          fontSize="12"
          fill="#444"
          fontFamily="sans-serif"
        >
          Peso: {peso}
        </text>
      )}
    </g>
  );
}


  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 0 16px 0" }}>
        <button
          onClick={() => navigate("/evaluaciones")}
          style={{
            background: "#2196f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 20px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            marginLeft: "32px"
          }}
        >
          Ir a inicio
        </button>
        <h2 style={{
          flex: 1,
          textAlign: "center",
          fontSize: "2.2rem",
          fontWeight: "bold",
          color: "#222",
          margin: 0,
          letterSpacing: "1px"
        }}>
          Árbol de Competencias
        </h2>
        <div style={{ width: 120 }} /> {/* Espacio para balancear el botón */}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label style={{ fontWeight: "bold", marginBottom: 8 }}>Selecciona una competencia:</label>
        <select
          value={competenciaId}
          onChange={e => setCompetenciaId(e.target.value)}
          style={{
            marginBottom: 24,
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid #bdbdbd",
            fontSize: "16px",
            minWidth: 260
          }}
        >
          <option value="">-- Selecciona --</option>
          {competencias.map(c => (
            <option key={c.competenciaId || c.id} value={c.competenciaId || c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        {loading && <p>Cargando árbol...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {arbol && arbol[0]?.children?.length > 0 ? (
          <div style={{
            width: "90vw",
            height: "70vh",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px #0001",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Tree
              data={arbol}
              orientation="vertical"
              renderCustomNodeElement={renderCustomNode}
              nodeSize={{ x: 350, y: 180 }} // Separación mejorada
              zoomable
              collapsible
              translate={{ x: window.innerWidth * 0.5, y: 100 }}
              zoom={1.2} // Acerca el árbol para que sea legible
            />
          </div>
        ) : competenciaId && !loading ? (
          <p>No hay componentes para esta competencia.</p>
        ) : null}
      </div>
    </div>
  );
}