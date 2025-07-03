import React from "react";

const ArbolCompetenciaSelector = ({ competenciaId, setCompetenciaId, onBuscar, loading }) => (
  <div style={{ marginBottom: 16 }}>
    <input
      type="number"
      placeholder="ID de competencia"
      value={competenciaId}
      onChange={(e) => setCompetenciaId(e.target.value)}
      style={{ marginRight: 8 }}
    />
    <button onClick={onBuscar} disabled={loading || !competenciaId}>
      {loading ? "Cargando..." : "Ver Árbol"}
    </button>
  </div>
);

export default ArbolCompetenciaSelector;