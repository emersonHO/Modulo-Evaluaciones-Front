import React, { useState } from "react";
import { Card, Table, Button, Dropdown, Modal, Form } from "react-bootstrap";

const applicables=["usapesos","restamenor","nummenor","restamayor","nummayor","copiaprimero","copiamenor","copiamayor","redondeo"]

const initialFormulas = [
    {
        name: "Grupo de formulas 1",
        formula: [
            { id: "asd", nameformula: "asd", desc: "0.2" },
            { id: "qwe", nameformula: "qwe", desc: "0.3" },
            { id: "zxc", nameformula: "zxc", desc: "0.4" },
        ]
    },
    {
        name: "Grupo de formulas 2",
        formula: [
            { id: "asd", nameformula: "asd", desc: "0.2" },
            { id: "qwe", nameformula: "qwe", desc: "0.3" },
            { id: "zxc", nameformula: "zxc", desc: "0.4" },
        ]
    },
    {
        name: "Grupo de formulas 3",
        formula: [
            { id: "asd", nameformula: "asd", desc: "0.2" },
            { id: "qwe", nameformula: "qwe", desc: "0.3" },
            { id: "zxc", nameformula: "zxc", desc: "0.4" },
        ]
    }
];

export default function GrupoFormulas() {
    const [formulas, setFormulas] = useState(initialFormulas);
    const [showModal, setShowModal] = useState(false);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);
    const [newformula, setNewformula] = useState({ 
        id: "",
        nameformula: "",
        desc: "",
        applicable: applicables.map(()=> 0)
    });

    const handleShow = (groupIndex) => {
        setSelectedGroupIndex(groupIndex);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setNewformula({ id: "", nameformula: "", desc: "", applicable: applicables.map(()=>0) });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewformula((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (selectedGroupIndex !== null) {
            const updatedFormulas = [...formulas];
            updatedFormulas[selectedGroupIndex].formula.push(newformula);
            setFormulas(updatedFormulas);
        }
        handleClose();
    };

    const handleCheckboxChange = (index) => {
        const nuevos = [...newformula.applicable];
        nuevos[index] = nuevos[index] === 1 ? 0 : 1;
        setNewformula((prev) => ({
          ...prev,
          applicable: nuevos
        }));
      };

    return (
        <section>
            <div>
                {formulas.map((item, groupIndex) => (
                    <Card className="m-4 p-2" key={groupIndex}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre de la fórmula</th>
                                        <th>Descripción de la fórmula</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {item.formula.map((f, i) => (
                                        <tr key={f.id + i}>
                                            <td>{f.id}</td>
                                            <td>{f.nameformula}</td>
                                            <td>{f.weight}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle>...</Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item>Ver fórmula</Dropdown.Item>
                                                        <Dropdown.Item>Editar fórmula</Dropdown.Item>
                                                        <Dropdown.Item>Eliminar fórmula</Dropdown.Item>
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

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir nueva fórmula</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                value={newformula.id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Nombre del fórmula</Form.Label>
                            <Form.Control
                                type="text"
                                name="nameformula"
                                value={newformula.nameformula}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDesc">
                            <Form.Label>Insertar descripción</Form.Label>
                            <Form.Control
                                type="text"
                                name="desc"
                                value={newformula.desc}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Criterios adicionales</Form.Label>
                            {applicables.map((label, index) => (
                                <Form.Check
                                key={index}
                                type="checkbox"
                                label={label}
                                checked={newformula.applicable[index] === 1}
                                onChange={() => handleCheckboxChange(index)}
                                className="mb-2"
                                />
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
}
