import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AsignarFormula(){
    const navigate= useNavigate();

    return(
        <main>
            <Button onClick={()=> navigate("../")}>Ir a inicio</Button>
        </main>
    );
}