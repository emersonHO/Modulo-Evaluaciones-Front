export const competenciaService = {
  // Obtener todas las competencias
  getCompetencias: async () => {
    const response = await fetch("http://localhost:8080/api/competencias");
    const data = await response.json();
    return data;
  },

  // Obtener una competencia por ID
  getCompetenciaById: async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/competencias/${id}`
    );
    const data = await response.json();
    return data;
  },

  // Asociar competencia con componente
  asociarCompetencia: async (competenciaId, componenteId) => {
    const response = await fetch(
      "http://localhost:8080/api/competencias/asociar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          competenciaId,
          componenteId,
        }),
      }
    );
    const data = await response.json();
    return data;
  },

  // Desasociar competencia de componente
  desasociarCompetencia: async (competenciaId, componenteId) => {
    const response = await fetch(
      `http://localhost:8080/api/competencias/asociar/${competenciaId}/${componenteId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  },
};
