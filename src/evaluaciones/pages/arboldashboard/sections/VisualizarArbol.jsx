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
        const match = n.name.match(/Peso: (\d+)/);
        if (match) set.add(parseInt(match[1], 10));
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

  function mapComponentes(componentes) {
    if (!componentes || componentes.length === 0) return [];
    // Ordena por peso descendente
    const ordenados = [...componentes].sort((a, b) => b.peso - a.peso);
    return ordenados.map(comp => ({
      name: `${comp.descripcion} (Peso: ${comp.peso})`,
      ...(comp.hijos && comp.hijos.length > 0
        ? { children: mapComponentes(comp.hijos) }
        : {})
    }));
  }

  return [
    {
      name: data.nombre,
      children: mapComponentes(data.componentes)
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
    let color = "#2196f3"; // Azul para la raíz
    if (!isRoot) {
      const pesoMatch = nodeDatum.name.match(/Peso: (\d+)/);
      const peso = pesoMatch ? parseInt(pesoMatch[1], 10) : null;
      color = peso !== null && pesoColorMap[peso] ? pesoColorMap[peso] : "#f44336";
    }
    return (
      <g>
        <circle r={20} fill={color} />
        <text fill="black" strokeWidth="1" x="25" y="5">
          {nodeDatum.name}
        </text>
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
              separation={{ siblings: 2, nonSiblings: 2 }}
              zoomable
              collapsible
              translate={{ x: window.innerWidth * 0.45, y: 60 }}
            />
          </div>
        ) : competenciaId && !loading ? (
          <p>No hay componentes para esta competencia.</p>
        ) : null}
      </div>
    </div>
  );
}