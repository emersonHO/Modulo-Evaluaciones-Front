import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import GrupoComponente from "./sections/grupoComponente";

export default function ComponentePage() {
    const navigate = useNavigate();

    return(
            <main>
                <Button onClick={()=> navigate("../")}>Ir a inicio</Button>
                <GrupoComponente/>
            </main>
        );
}
