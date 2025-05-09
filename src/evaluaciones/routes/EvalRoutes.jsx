import { Navigate, Route, Routes } from 'react-router-dom';
import Rubricas from '../pages/rubricas';
import Formulas from "../pages/formulas"

export const EvalRoutes = () => {
  return (
    <Routes>
        <Route path='formulas' element={<Formulas/>}/>
        <Route path='rubricas' element={<Rubricas/>} />
    </Routes>
  )
}
