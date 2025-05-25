import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function MainEval(){
    const navigate= useNavigate();
    return(
        <main>
            <Button onClick={() => navigate("/evaluaciones/asignarformula")}>Asignar formula</Button>
            <Button onClick={() => navigate("/evaluaciones/formulas")}>A formulas</Button>
            <Button onClick={() => navigate("/evaluaciones/componente")}>A componentes/competencia</Button>
            <Button onClick={() => navigate("/evaluaciones/rubricas")}>A rubrica</Button>
            <Button onClick={() => navigate("/evaluaciones/grupocomponente")}>Componentes</Button>
        </main>
    )
}