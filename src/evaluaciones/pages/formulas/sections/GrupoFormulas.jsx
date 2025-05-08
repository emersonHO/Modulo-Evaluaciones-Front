// GrupoFormulas.js
import React, { useState, useEffect } from "react";
import { Card, Table, Button, Dropdown } from "react-bootstrap";
import AddFormula from './addFormula';
import axios from "axios";

const applicables = ["usapesos", "restamenor", "nummenor", "restamayor", "nummayor", "copiaprimero", "copiamenor", "copiamayor", "redondeo"];

export default function GrupoFormulas() {
    const [formulas, setFormulas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
    const [newformula, setNewformula] = useState({
        codigo: "",
        desc: "",
        applicable: applicables.map(() => 0)
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/formula")
            .then(res => {
                setFormulas([
                    {
                        name: "Grupo de fórmulas",
                        formula: res.data.map(f => ({
                            id: f.id,
                            codigo: f.codigo,
                            desc: f.descripcion,
                            estado: f.estado
                        }))
                    }
                ]);
            })
            .catch(err => console.error("Error cargando fórmulas:", err));
    }, []);

    const handleShow = (groupIndex) => {
        setSelectedGroupIndex(groupIndex);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setNewformula({ id: "", nameformula: "", desc: "", applicable: applicables.map(() => 0) });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewformula((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const payload = {
            codigo: newformula.codigo,
            descripcion: newformula.desc,
            formula: "asd",
            funcionId: 1,
            estado: "1",
            institucionId: 1,
            departamentoId: 1,
            institutoId: 1,
            usaPesos: newformula.applicable[0] ? 1 : 0,
            restaMenor: newformula.applicable[1] ? 1 : 0,
            numMenor: newformula.applicable[2] ? 1 : 0,
            restaMayor: newformula.applicable[3] ? 1 : 0,
            numMayor: newformula.applicable[4] ? 1 : 0,
            copiaPrimero: newformula.applicable[5] ? 1 : 0,
            copiaMenor: newformula.applicable[6] ? 1 : 0,
            copiaMayor: newformula.applicable[7] ? 1 : 0,
            redondeo: newformula.applicable[8] ? 1 : 0
        };
        console.log("Enviando fórmula:", payload);
        axios.post("http://localhost:8080/api/formula", payload)
            .then(res => {
                const updated = [...formulas];
                updated[selectedGroupIndex].formula.push({
                    id: res.data.id,
                    nameformula: res.data.codigo,
                    desc: res.data.descripcion
                });
                setFormulas(updated);
                handleClose();
            })
            .catch(err => {
                console.error("Error al guardar fórmula:", err);
            });
    };

    const handleCheckboxChange = (index) => {
        const nuevos = [...newformula.applicable];
        nuevos[index] = nuevos[index] === 1 ? 0 : 1;
        setNewformula((prev) => ({
            ...prev,
            applicable: nuevos
        }));
    };

    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8080/api/formula/${id}`)
        .then(res => {
            const updated = formulas.map(group => ({
                ...group,
                formula: group.formula.filter(f => f.id !== id)
            }));
            setFormulas(updated);
        })
        .catch(err => {
            console.error("Error al eliminar fórmula:", err);
        });
    }

    return (
        <section>
            <div>
                {formulas.map((item, groupIndex) => (
                    <Card className="m-4 p-2" key={groupIndex}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr className="text-center">
                                        <th>Codigo</th>
                                        <th>Descripción de la fórmula</th>
                                        <th>Estado de la fórmula</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {item.formula.map((f, i) => (
                                        <tr key={f.id + i}>
                                            <td>{f.codigo}</td>
                                            <td>{f.desc}</td>
                                            <td>
                                                <span className={
                                                    f.estado === "1"
                                                        ? "badge bg-success"
                                                        : f.estado === "2"
                                                        ? "badge bg-danger"
                                                        : "badge bg-secondary"
                                                }>
                                                    {f.estado === "1" ? "Activo" : f.estado === "2" ? "Suspendido" : f.estado}
                                                </span>
                                            </td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle>...</Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Ver fórmula</Dropdown.Item>
                                                        <Dropdown.Item>Editar fórmula</Dropdown.Item>
                                                        <Dropdown.Item onClick={()=>handleDelete(f.id)}>Eliminar fórmula</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Button onClick={() => handleShow(groupIndex)}>Añadir fórmula</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <AddFormula
                show={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
                newformula={newformula}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                applicables={applicables}
            />
        </section>
    );
}
