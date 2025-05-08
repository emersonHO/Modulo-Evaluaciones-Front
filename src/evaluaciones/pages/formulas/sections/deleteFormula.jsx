// DeleteFormula.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteFormula({ show, handleClose, handleConfirm, id }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estás seguro de que deseas eliminar esta fórmula?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleConfirm(id)}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
