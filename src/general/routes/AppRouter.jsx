import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AuthRoutes } from "../../seguridad/routes/AuthRoutes";
import { CursosRoutes } from "../../cursos/routes/CursosRoutes";
import { EvaluacionesRoutes } from "../../evaluaciones/routes/EvaluacionesRoutes";
import ComponenteCompetencia from "../../evaluaciones/pages/componente-competencia/componente/ComponenteCompetencia";

import { CheckingAuth } from "../../seguridad/components";
import { useCheckAuth } from "../../seguridad/hooks";

export const AppRouter = () => {
  const status = useCheckAuth();
  const location = useLocation();

  console.log("AppRouter - Status:", status);
  console.log("AppRouter - Ruta actual:", location.pathname);

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/cursos/*" element={<CursosRoutes />} />
          <Route path="/evaluaciones/*" element={<EvaluacionesRoutes />} />
        </>
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route
        path="*"
        element={
          <Navigate
            to={status === "authenticated" ? "/evaluaciones/*" : "/auth/login"}
          />
        }
      />
    </Routes>
  );
};
