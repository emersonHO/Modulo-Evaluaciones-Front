// GrupoFormulas.js
import React, { useState, useEffect } from "react";
import { Card, Table, Button, Dropdown } from "react-bootstrap";
import AddFormula from './addFormula';
import DeleteFormula from './deleteFormula'
import ViewFormula from "./viewFormula";
import axios from "axios";

const applicables = ["usapesos", "restamenor", "nummenor", "restamayor", "nummayor", "copiaprimero", "copiamenor", "copiamayor", "redondeo"];

export default function GrupoFormulas() {
    const [formulas, setFormulas] = useState({
        name: "Grupo de fórmulas",
        formula: []
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteId, setDeleteId]= useState(null);
    const [showDeleteModal, setShowDeleteModal]= useState(false);
    const [showViewer, setShowViewer]= useState(false);
    const [selectedFormula, setSelectedFormula] = useState(null);
    const [newformula, setNewformula] = useState({
        codigo: "",
        descripcion: "",
        formula: "asd",
        funcionId: 1,
        estado: "1",
        institucionId: 1,
        institutoId: 1,
        departamentoId: 1,
        applicable: applicables.map(() => 0)
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/formula")
            .then(res => {
                setFormulas({
                    name: "Grupo de fórmulas",
                    formula: res.data.map(f => ({
                        id: f.id,
                        codigo: f.codigo,
                        descripcion: f.descripcion,
                        formula: f.formula,
                        estado: f.estado,
                        usaPesos: f.usaPesos,
                        restaMenor: f.restaMenor,
                        numMenor: f.numMenor,
                        restaMayor: f.restaMayor,
                        numMayor: f.numMayor,
                        copiaPrimero: f.copiaPrimero,
                        copiaMenor: f.copiaMenor,
                        copiaMayor: f.copiaMayor,
                        redondeo: f.redondeo,
                        institucionId: f.institucionId,
                        departamentoId: f.departamentoId,
                        funcionId: f.funcionId,
                        institutoId: f.institutoId
                    }))
                });
            })
            .catch(err => console.error("Error cargando fórmulas:", err));
    }, []);

    const handleAddShow = () => setShowAddModal(true);
    const handleAddClose = () => {
        setShowAddModal(false);
        setNewformula({ codigo: "", descripcion: "", applicable: applicables.map(() => 0) });
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
            descripcion: newformula.descripcion,
            formula: newformula.formula,
            funcionId: newformula.funcionId,
            estado: newformula.estado,
            institucionId: newformula.institucionId,
            departamentoId: newformula.departamentoId,
            institutoId: newformula.institutoId,
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

        axios.post("http://localhost:8080/api/formula", payload)
            .then(res => {
                setFormulas(prev => ({
                    ...prev,
                    formula: [...prev.formula, {
                        id: res.data.id,
                        codigo: res.data.codigo,
                        descripcion: res.data.descripcion,
                        estado: res.data.estado
                    }]
                }));
                handleAddClose();
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

    const handleDeleteShow=(id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };
    const handleDeleteClose = () => {
        setDeleteId(null);
        setShowDeleteModal(false);
    };

    const handleViewFormula = (formula) => {
        setSelectedFormula(formula);
        setShowViewer(true);
    };
    
    const handleCloseViewer = () => {
        setShowViewer(false);
        setSelectedFormula(null);
    };


    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/formula/${id}`)
            .then(() => {
                setFormulas(prev => ({
                    ...prev,
                    formula: prev.formula.filter(f => f.id !== id)
                }));
                handleDeleteClose()
            })
            .catch(err => {
                console.error("Error al eliminar fórmula:", err);
            });
    };

    return (
        <section>
            <Card className="m-4 p-2">
                <Card.Title>{formulas.name}</Card.Title>
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
                            {formulas.formula.map((f, i) => (
                                <tr key={f.id}>
                                    <td>{f.codigo}</td>
                                    <td>{f.descripcion}</td>
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
                                                <Dropdown.Item onClick={() => handleViewFormula(f)}>Ver fórmula</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDeleteShow(f.id)}>Eliminar fórmula</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={handleAddShow}>Añadir fórmula</Button>
                </Card.Body>
            </Card>

            <AddFormula
                show={showAddModal}
                handleClose={handleAddClose}
                handleSave={handleSave}
                newformula={newformula}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                applicables={applicables}
            />
            <DeleteFormula
                show={showDeleteModal}
                handleClose={handleDeleteClose}
                handleDelete={()=>handleDelete(deleteId)}
            />
            <ViewFormula
                show={showViewer}
                handleClose={handleCloseViewer}
                formula={selectedFormula}
            />
        </section>
    );
}
