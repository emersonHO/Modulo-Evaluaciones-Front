import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const AddRubrica = ({ show, handleClose }) => {
    const [newRubrica, setNewRubrica] = useState({
        nombre: "",
        descripcion: "",
        estado: "1",
        criterios: [
            { descripcion: "", nivel: 1, puntaje: 0, estado: "1" }
        ]
    });

    const handleRubricaChange = (e) => {
        const { name, value } = e.target;
        setNewRubrica((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCriterioChange = (index, e) => {
        const { name, value } = e.target;
        const criterios = [...newRubrica.criterios];
        criterios[index][name] = value;
        setNewRubrica((prev) => ({
            ...prev,
            criterios
        }));
    };

    const handleAddCriterio = () => {
        setNewRubrica((prev) => ({
            ...prev,
            criterios: [...prev.criterios, { descripcion: "", nivel: 1, puntaje: 0, estado: "1" }]
        }));
    };

    const handleSave = () => {
        // Guardar la rúbrica
        axios.post("http://localhost:8080/api/rubrica", {
            nombre: newRubrica.nombre,
            descripcion: newRubrica.descripcion,
            estado: newRubrica.estado,
            criterios: newRubrica.criterios
        })
        .then(res => {
            console.log("Rúbrica guardada:", res.data);
            handleClose();
        })
        .catch(err => {
            console.error("Error al guardar la rúbrica:", err);
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir nueva rúbrica</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={newRubrica.nombre}
                            onChange={handleRubricaChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcion"
                            value={newRubrica.descripcion}
                            onChange={handleRubricaChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado</Form.Label>
                        <Form.Control
                            as="select"
                            name="estado"
                            value={newRubrica.estado}
                            onChange={handleRubricaChange}
                        >
                            <option value="1">Activo</option>
                            <option value="2">Suspendido</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Label>Criterios</Form.Label>
                    {newRubrica.criterios.map((criterio, index) => (
                        <div key={index} className="mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        type="text"
                                        name="descripcion"
                                        placeholder="Descripción del criterio"
                                        value={criterio.descripcion}
                                        onChange={(e) => handleCriterioChange(index, e)}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        type="number"
                                        name="nivel"
                                        placeholder="Nivel"
                                        value={criterio.nivel}
                                        onChange={(e) => handleCriterioChange(index, e)}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        type="number"
                                        name="puntaje"
                                        placeholder="Puntaje"
                                        value={criterio.puntaje}
                                        onChange={(e) => handleCriterioChange(index, e)}
                                    />
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                        as="select"
                                        name="estado"
                                        value={criterio.estado}
                                        onChange={(e) => handleCriterioChange(index, e)}
                                    >
                                        <option value="1">Activo</option>
                                        <option value="2">Suspendido</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </div>
                    ))}
                    <Button variant="link" onClick={handleAddCriterio}>
                        Añadir Criterio
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRubrica;
