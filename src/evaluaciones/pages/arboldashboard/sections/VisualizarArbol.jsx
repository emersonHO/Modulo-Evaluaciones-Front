import { useEffect, useState, useMemo } from "react";
import Tree from "react-d3-tree";
import { competenciaService } from "../../../services/competenciaService";
import { getArbolCompetencia } from "../../../services/arbolCompetenciaService";

// Paleta de colores para los nodos según peso
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

// Función recursiva para transformar componentes y sus hijos, jerarquizando por peso
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

// Transforma la respuesta del backend al formato de react-d3-tree
function transformarArbol(data) {
  if (!data || !data.componentes || data.componentes.length === 0) return [];
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

  // Cargar todas las competencias al montar
  useEffect(() => {
    competenciaService.getCompetencias()
      .then(setCompetencias)
      .catch(() => setError("Error al cargar competencias"));
  }, []);

  // Cargar el árbol de la competencia seleccionada
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

  // Renderizado personalizado de nodos para colorear según peso
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
    <div>
      <h2>Árbol de Competencias</h2>
      <label>Selecciona una competencia: </label>
      <select
        value={competenciaId}
        onChange={e => setCompetenciaId(e.target.value)}
        style={{ marginBottom: 16 }}
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
        <div style={{ width: "100%", height: "80vh" }}>
          <Tree
            data={arbol}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNode}
            separation={{ siblings: 2, nonSiblings: 2 }}
            zoomable
            collapsible
          />
        </div>
      ) : competenciaId && !loading ? (
        <p>No hay componentes para esta competencia.</p>
      ) : null}
    </div>
  );
}