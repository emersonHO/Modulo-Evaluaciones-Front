import { Navigate, Route, Routes } from 'react-router-dom';
import Formulas from "../pages/formulas"

export const EvalRoutes = () => {
  return (
    <Routes>
        <Route path='formulas' element={<Formulas/>}/>
    </Routes>
  )
}
