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
    const { data } = await evaluacionesApi.post(
      "/componente-competencia",
      componente
    );
    return data;
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
    const { data } = await evaluacionesApi.get("/componentes-con-peso");
    return data;
  },

  // Obtener todas las competencias
  getCompetencias: async () => {
    const { data } = await evaluacionesApi.get("/competencias");
    return data;
  },
};
