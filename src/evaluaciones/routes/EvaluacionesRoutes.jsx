import { Route, Routes, useLocation } from "react-router-dom";
import AsociarComponentesPage from "../pages/AsociarComponentesPage";
import { CompetenciasPage } from "../pages/CompetenciasPage";
import Formulas from "../pages/formulas";
import AsignarFormula from "../pages/asignarformula";
import Rubricas from "../pages/rubricas";
import MainEval from "../pages/evalHome";
import FormularioRubrica from "../pages/rubricas/FormularioRubrica";

export const EvaluacionesRoutes = () => {
  const location = useLocation();

  console.log("EvaluacionesRoutes - Ruta actual:", location.pathname);

  return (
    <Routes>
      <Route path="rubricas" element={<Rubricas />} />
      <Route path="rubricas/nueva" element={<FormularioRubrica />} />
      <Route path="rubricas/:id/editar" element={<FormularioRubrica />} />
      <Route path="componente" element={<AsociarComponentesPage />} />
      <Route path="competencias" element={<CompetenciasPage />} />
      <Route path='formulas' element={<Formulas/>}/>
      <Route path="asignarformula" element={<AsignarFormula/>}/>
      <Route path="/" element={<MainEval/>}/>
    </Routes>
  );
};
