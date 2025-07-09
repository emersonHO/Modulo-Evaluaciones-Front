import { useEffect, useState } from "react";
import { getArbolCompetencia } from "../../../services/arbolCompetenciaService";
import Tree from "react-d3-tree";

export default function VisualizarArbol() {
  const [arbol, setArbol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getArbolCompetencia()
      .then(setArbol)
      .catch(() => setError("Error al cargar el árbol"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando árbol...</p>;
  if (error) return <p>{error}</p>;
  if (!arbol) return null;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <h2>Árbol de Competencias</h2>
      <Tree data={arbol} orientation="vertical" />
    </div>
  );
}