import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function RubricaViewer({ show, handleClose, rubrica }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableRubrica, setEditableRubrica] = useState(null);
    const [criterios, setCriterios] = useState([]);

    useEffect(() => {
        setEditableRubrica(rubrica);
        setIsEditing(false);

        // Cargar los criterios de la rúbrica cuando se visualiza
        if (rubrica && rubrica.id) {
            axios.get(`http://localhost:8080/api/criterioRubrica/rubrica/${rubrica.id}`)
                .then(response => {
                    setCriterios(response.data); // Guardamos los criterios
                })
                .catch((err) => {
                    console.error("Error al cargar los criterios:", err);
                });
        }
    }, [rubrica]);

    const toggleEdit = () => setIsEditing(true);
    const cancelEdit = () => {
        setEditableRubrica(rubrica);
        setIsEditing(false);
    };

    const handleSave = () => {
        const payload = {
            ...editableRubrica,
        };
        console.log("Guardando cambios en la rúbrica: ", payload);
        axios.put(`http://localhost:8080/api/rubrica/${editableRubrica.id}`, payload)
            .then(() => {
                setIsEditing(false);
                handleClose();
            })
            .catch((err) => {
                console.error("Error al actualizar la rúbrica:", err);
            });
    };

    if (!editableRubrica) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Editar rúbrica" : "Detalle de la rúbrica"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Nombre:</strong> {editableRubrica.nombre}</p>
                <p><strong>Descripción:</strong> {editableRubrica.descripcion}</p>
                <p><strong>Estado:</strong> {
                    editableRubrica.estado === "1" ? "Activo" :
                    editableRubrica.estado === "2" ? "Suspendido" :
                    editableRubrica.estado
                }</p>
                <hr />
                <p><strong>ID del componente del curso:</strong> {editableRubrica.cursocomponenteid}</p>
                <hr />
                <p><strong>Criterios asociados:</strong></p>
                {criterios.length === 0 ? (
                    <p>No hay criterios asociados a esta rúbrica.</p>
                ) : (
                    <ul>
                        {criterios.map((criterio) => (
                            <li key={criterio.id}>
                                <p><strong>Descripción:</strong> {criterio.descripcion}</p>
                                <p><strong>Nivel:</strong> {criterio.nivel}</p>
                                <p><strong>Puntaje:</strong> {criterio.puntaje}</p>
                            </li>
                        ))}
                    </ul>
                )}
                <hr />
                <p><strong>¿Deseas editar los criterios asociados?</strong></p>
                {isEditing && (
                    <Form>
                        <Button variant="secondary" onClick={cancelEdit}>Cancelar edición</Button>
                        <Button variant="primary" onClick={handleSave}>Guardar cambios</Button>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!isEditing && (
                    <Button variant="warning" onClick={toggleEdit}>Editar</Button>
                )}
                <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
