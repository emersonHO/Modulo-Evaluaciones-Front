import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const applicableLabels = [
    "Usa Pesos",
    "Resta Menor",
    "Número Menor",
    "Resta Mayor",
    "Número Mayor",
    "Copia Primero",
    "Copia Menor",
    "Copia Mayor",
    "Redondeo"
];

export default function FormulaViewer({ show, handleClose, formula }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableFormula, setEditableFormula] = useState(null);

    useEffect(() => {
        setEditableFormula(formula);
        setIsEditing(false);
    }, [formula]);

    const toggleEdit = () => setIsEditing(true);
    const cancelEdit = () => {
        setEditableFormula(formula);
        setIsEditing(false);
    };

    const handleCheckboxChange = (index) => {
        const keys = [
            "usaPesos", "restaMenor", "numMenor", "restaMayor",
            "numMayor", "copiaPrimero", "copiaMenor", "copiaMayor", "redondeo"
        ];
        const key = keys[index];

        setEditableFormula((prev) => ({
            ...prev,
            [key]: prev[key] === 1 ? 0 : 1
        }));
    };

    const handleSave = () => {
        const payload = {
            ...editableFormula,
        };
        console.log("Checando el cuerpo: ", payload)
        axios.put(`http://localhost:8080/api/formula/${editableFormula.id}`, payload)
            .then(() => {
                setIsEditing(false);
                handleClose();
            })
            .catch((err) => {
                console.error("Error al actualizar la fórmula:", err);
            });
    };

    if (!editableFormula) return null;

    const applicableValues = [
        editableFormula.usaPesos,
        editableFormula.restaMenor,
        editableFormula.numMenor,
        editableFormula.restaMayor,
        editableFormula.numMayor,
        editableFormula.copiaPrimero,
        editableFormula.copiaMenor,
        editableFormula.copiaMayor,
        editableFormula.redondeo
    ];

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Editar fórmula" : "Detalle de la fórmula"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Código:</strong> {editableFormula.codigo}</p>
                <p><strong>Descripción:</strong> {editableFormula.descripcion}</p>
                <p><strong>Estado:</strong> {
                    editableFormula.estado === "1" ? "Activo" :
                    editableFormula.estado === "2" ? "Suspendido" :
                    editableFormula.estado
                }</p>
                <hr />
                    <p><strong>ID de la Institución:</strong> {editableFormula.institucionId}</p>
                    <p><strong>ID del departamento:</strong> {editableFormula.departamentoId}</p>
                    <p><strong>ID del instituto:</strong> {editableFormula.institutoId}</p>
                <hr />
                <p><strong>Aplicabilidad:</strong></p>
                <Form>
                    {applicableLabels.map((label, idx) => (
                        <Form.Check
                            key={idx}
                            type="checkbox"
                            label={label}
                            checked={applicableValues[idx] === 1}
                            disabled={!isEditing}
                            onChange={() => handleCheckboxChange(idx)}
                        />
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {isEditing ? (
                    <>
                        <Button variant="secondary" onClick={cancelEdit}>Cancelar</Button>
                        <Button variant="primary" onClick={handleSave}>Guardar cambios</Button>
                    </>
                ) : (
                    <Button variant="warning" onClick={toggleEdit}>Editar</Button>
                )}
                <Button variant="outline-secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}
