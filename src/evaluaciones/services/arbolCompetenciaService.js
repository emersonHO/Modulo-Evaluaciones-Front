import axios from "axios";

export const getArbolCompetencia = async (competenciaId) => {
  const token = localStorage.getItem("token");
  const res = await axios.get(
    `/api/competencias/${competenciaId}/arbol-componentes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};