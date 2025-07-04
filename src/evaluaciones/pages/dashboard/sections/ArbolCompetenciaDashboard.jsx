import React, { useState } from "react";
import { getArbolCompetencia } from "../services/arbolCompetenciaService";
import ArbolCompetenciaSelector from "../components/ArbolCompetenciaSelector";
import ArbolCompetenciaTree from "../components/ArbolCompetenciaTree";

const transformComponente = (componente) => ({
  name: `${componente.descripcion} (Peso: ${componente.peso})`,
  children: componente.hijos?.map(transformComponente),
});

const transformToTree = (arbol) => {
  if (!arbol) return {};
  return {
    name: arbol.nombre,
    children: arbol.componentes?.map(transformComponente),
  };
};

const ArbolCompetenciaDashboard = () => {
  const [competenciaId, setCompetenciaId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchArbol = async () => {
    setLoading(true);
    try {
      const arbol = await getArbolCompetencia(competenciaId);
      setData(transformToTree(arbol));
    } catch {
      setData(null);
      alert("No se pudo cargar el árbol.");
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <h2>Dashboard Árbol de Competencias</h2>
      <ArbolCompetenciaSelector
        competenciaId={competenciaId}
        setCompetenciaId={setCompetenciaId}
        onBuscar={fetchArbol}
        loading={loading}
      />
      <ArbolCompetenciaTree data={data} />
    </div>
  );
};

export default ArbolCompetenciaDashboard;