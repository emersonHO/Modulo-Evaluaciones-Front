import { Modal, Button, Form } from 'react-bootstrap';

const AddComponente = ({ show, handleClose, handleSave, newComponente, handleChange }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir nuevo componente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCodigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            name="codigo"
                            value={newComponente.codigo}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={newComponente.nombre}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descripcion"
                            value={newComponente.descripcion}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleSave}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddComponente;