import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function ComponenteViewer({ show, handleClose, componente }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableComponente, setEditableComponente] = useState(null);

    useEffect(() => {
        if (componente) {
            setEditableComponente(componente);
            setIsEditing(false);
        }
    }, [componente]);

    const toggleEdit = () => setIsEditing(true);
    const cancelEdit = () => {
        setEditableComponente(componente);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditableComponente(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        axios.put(`http://localhost:8080/api/componente/${editableComponente.id}`, editableComponente)
            .then(() => {
                setIsEditing(false);
                handleClose();
                window.location.reload();
            })
            .catch(err => {
                console.error("Error al actualizar el componente:", err);
            });
    };

    if (!editableComponente) return null;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Editar componente" : "Detalle del componente"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigo"
                            value={editableComponente.codigo}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={editableComponente.nombre}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            value={editableComponente.descripcion}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isEditing ? (
                    <>
                        <Button variant="secondary" onClick={cancelEdit}>Cancelar</Button>
                        <Button variant="primary" onClick={handleSave}>Guardar</Button>
                    </>
                ) : (
                    <Button variant="warning" onClick={toggleEdit}>Editar</Button>
                )}
                <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
