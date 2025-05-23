import { evaluacionesApi } from "../../api/evaluacionesApi";

export async function fetchEvaluationTree() {
  const response = await evaluacionesApi.fetch('/competencia-componente-formula');
  if (!response.ok) throw new Error('Error fetching tree');
  return response.json();
}