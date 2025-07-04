import { TextField } from "@mui/material";
import { useState } from "react";

export default function CriteriosAsociados({ rubricaInfo, setRubricaInfo }) {
    const [criterioDesc, setCriterioDesc] = useState("");
    const [niveles, setNiveles] = useState([]);
    const [nivel, setNivel] = useState({ titulo: "", descripcion: "", puntajemax: "" });

    const agregarNivel = () => {
        setNiveles([...niveles, nivel]);
        setNivel({ titulo: "", descripcion: "", puntajemax: "" });
    };
    const agregarCriterio = () => {
        const nuevoCriterio = {
            descripcion: criterioDesc,
            estado: "ACTIVO",
            niveles: niveles.map(n => ({
                titulo: n.titulo,
                descripcion: n.descripcion,
                puntajemax: parseInt(n.puntajemax)
            })),
        };
        setRubricaInfo(prev => ({
            ...prev,
            criterios: [...prev.criterios, nuevoCriterio],
        }));
        setCriterioDesc("");
        setNiveles([]);
    };


    return (
        <section>
            <div>
                <h3 className="h3-text">Crear criterios para la rúbrica</h3>
                <div className="criterios-rubrica-container">

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
                        <TextField
                            label="Título del nivel"
                            value={nivel.titulo}
                            onChange={(e) => setNivel({ ...nivel, titulo: e.target.value })}
                            style={{ marginRight: "1rem" }}
                        />
                        <TextField
                            label="Descripción del nivel"
                            value={nivel.descripcion}
                            onChange={(e) => setNivel({ ...nivel, descripcion: e.target.value })}
                            style={{ marginRight: "1rem" }}
                        />
                        <TextField
                            label="Puntaje máximo"
                            type="number"
                            value={nivel.puntajemax}
                            onChange={(e) => setNivel({ ...nivel, puntajemax: e.target.value })}
                        />
                        <button className="criterio-more">+</button>
                    </div>

                    <button
                        className="btn-añadir-criterio"
                    >
                        Añadir un criterio
                    </button>
                </div>
            </div>
        </section>
    );
}
