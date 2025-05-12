import { Routes, Route } from "react-router-dom";
import { CompetenciasPage } from "../evaluaciones/pages/CompetenciasPage";

export const EvaluacionesRoutes = () => {
  return (
    <Routes>
      <Route path="competencias" element={<CompetenciasPage />} />
      {/* Otras rutas existentes */}
    </Routes>
  );
};
