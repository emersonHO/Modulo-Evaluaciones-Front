import { TextField, Button } from "@mui/material";
import { useState } from "react";

export default function CriteriosAsociados() {
    const [criterioTitle, setCriterioTitle] = useState("");
    const [criterioDesc, setCriterioDesc] = useState("");
    const [nivelPuntos, setNivelPuntos]= useState([]);
    const [nivelTitle, setNivelTitle]= useState([]);
    const [nivelDesc, setNivelDesc]= useState([]);

    return (
        <section>
            <div>
                <h3>Crear criterios para la rúbrica</h3>
                <div className="criterios-rubrica-container">
                    <div className="fila-title-button">
                        <TextField
                            label="Nombre de la rúbrica"
                            variant="outlined"
                            value={criterioTitle}
                            onChange={(e) => setCriterioTitle(e.target.value)}
                            fullWidth
                        />
                        <Button>
                            ...
                        </Button>
                    </div>

                    <div className="fila-desc">
                        <TextField
                            label="Descripción de la rúbrica"
                            variant="outlined"
                            value={criterioDesc}
                            onChange={(e) => setCriterioDesc(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                            style={{ marginTop: "1rem" }}
                        />
                    </div>

                    <div className="criterio-rubrica">
                        <Button className="criterio-more">+</Button>
                    </div>

                    <Button>
                        Añadir un criterio
                    </Button>
                </div>
            </div>
        </section>
    );
}
