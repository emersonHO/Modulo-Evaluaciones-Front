import React from "react";
import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainInfo from "./sections/MainInfo";
import ExtraInfo from "./sections/ExtraInfo";
import CriteriosAsociados from "./sections/CriteriosAsociados";
import "../../views/crearRubricaStyles.css";

export default function CrearRubrica(){
    const navigate= useNavigate();

    return(
        <main>
            <div className="crear-rubrica-layout">
                <div className="main-crear-rubrica-container">
                    <Button onClick={()=> navigate("../")}>Ir a inicio</Button>
                    <MainInfo/>
                    <CriteriosAsociados/>
                </div>
                <div className="extra-info-crear-rubrica">
                    <ExtraInfo/>
                </div>
            </div>
        </main>
    );
}