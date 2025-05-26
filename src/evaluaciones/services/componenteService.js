import { evaluacionesApi } from "../../api/evaluacionesApi";

export const componenteService = {
  // Obtener todos los componentes con sus competencias
  getComponentes: async () => {
    const { data } = await evaluacionesApi.get(
      "/componente-competencia-con-competencias"
    );
    return data;
  },

  // Obtener un componente por ID
  getComponenteById: async (id) => {
    const { data } = await evaluacionesApi.get(`/componente-competencia/${id}`);
    return data;
  },

  // Crear un nuevo componente
  createComponente: async (componente) => {
    try {
      const { data } = await evaluacionesApi.post("/componente-competencia", {
        componenteId: componente.componenteId,
        competenciaId: componente.competenciaId,
        peso: componente.peso,
      });
      return data;
    } catch (error) {
      console.error(
        "Error en createComponente:",
        error.response?.data || error
      );
      throw error;
    }
  },

  // Actualizar un componente existente
  updateComponente: async (id, componente) => {
    const { data } = await evaluacionesApi.put(
      `/componente-competencia/${id}`,
      componente
    );
    return data;
  },

  // Eliminar un componente
  deleteComponente: async (id) => {
    const { data } = await evaluacionesApi.delete(
      `/componente-competencia/${id}`
    );
    return data;
  },

  // Obtener todos los detalles de componentes y competencias
  getComponentesDetalle: async () => {
    const { data } = await evaluacionesApi.get(
      "/componente-competencia-detalle"
    );
    return data;
  },

  // Obtener componentes agrupados con competencias asociadas
  getComponentesConCompetencias: async () => {
    const { data } = await evaluacionesApi.get(
      "/componente-competencia-con-competencias"
    );
    return data;
  },

  // Obtener todos los componentes con peso asignado
  getComponentesConPeso: async () => {
    try {
      const { data } = await evaluacionesApi.get("/componentes-con-peso");
      return data;
    } catch (error) {
      console.error("Error en getComponentesConPeso:", error);
      throw error;
    }
  },

  // Obtener todas las competencias
  getCompetencias: async () => {
    const { data } = await evaluacionesApi.get("/competencias");
    return data;
  },

  // Eliminar un componente por nombre
  deleteComponenteByNombre: async (nombreComponente) => {
    try {
      const { data } = await evaluacionesApi.delete(
        `/componente-competencia/by-componente/${encodeURIComponent(nombreComponente)}`
      );
      return data;
    } catch (error) {
      console.error("Error en deleteComponenteByNombre:", error);
      throw error;
    }
  },

  // Crear un nuevo componente base
  crearComponenteBase: async (componente) => {
    try {
      const response = await evaluacionesApi.post("/componentes-con-peso", {
        descripcion: componente.descripcion,
        peso: parseFloat(componente.peso),
      });

      if (!response.data) {
        throw new Error("No se recibió respuesta del servidor");
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error en crearComponenteBase:",
        error.response?.data || error
      );
      throw error;
    }
  },

  // Obtener componentes únicos con id, descripcion y peso
  getComponentesUnicos: async () => {
    try {
      const { data } = await evaluacionesApi.get("/componentes-unicos");
      return data;
    } catch (error) {
      console.error("Error en getComponentesUnicos:", error);
      throw error;
    }
  },
};
