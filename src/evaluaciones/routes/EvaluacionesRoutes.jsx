import { Route, Routes, useLocation } from "react-router-dom";
import AsociarComponentesPage from "../pages/AsociarComponentesPage";
import { CompetenciasPage } from "../pages/CompetenciasPage";

export const EvaluacionesRoutes = () => {
  const location = useLocation();

  console.log("EvaluacionesRoutes - Ruta actual:", location.pathname);

  return (
    <Routes>
      <Route path="componente" element={<AsociarComponentesPage />} />
      <Route path="competencias" element={<CompetenciasPage />} />
      <Route path="/" element={<AsociarComponentesPage />} />
      <Route path="*" element={<AsociarComponentesPage />} />
    </Routes>
  );
};
