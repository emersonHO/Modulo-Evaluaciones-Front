import { Navigate, Route, Routes } from 'react-router-dom';
import Rubricas from "../pages/rubricas";
import {FormularioRubrica} from "../pages/rubricas/FormularioRubrica";
import Formulas from "../pages/formulas"

export const EvalRoutes = () => {
  return (
    <Routes>
        <Route path='formulas' element={<Formulas/>}/>
        <Route path="rubricas" element={<Rubricas/>}/>
        <Route path="rubricas/nueva" element={<FormularioRubrica />} />
        <Route path="rubricas/:id/editar" element={<FormularioRubrica />} />
    </Routes>
  )
}
