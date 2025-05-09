import React, {useState, useEffect} from "react";
import {Card, Table, Buttom, Dropdown} from "react-bootstrap";
import AddRubrica from "./addRubrica";
import DeleteRubrica from "./deleteRubrica";
import ViewRubrica from "./viewRubrica";
import axios from "axios";

export default function GrupoRubricas(){
    const [rubricas, setRubricas] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedRubrica, setSelectedRubrica] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() =>{
        axios.get("http://localhost:8080/api/rubricas")
        .then(res => setRubricas(res.data))
        .catch(err => console.error("Error al cargar rubricas: ", err));
    })

    const handleAddRubrica = (nuevaRubrica) => {
        axios.post("http://localhost:8080/api/rubricas", nuevaRubrica)
            .then(res => {
                setRubricas([...rubricas, res.data]);
                setShowAddModal(false);
            })
            .catch(err => console.error("Error al guardar rúbrica:", err));
    };

    const handleDeleteRubrica = (id) => {
        axios.delete(`http://localhost:8080/api/rubricas/${id}`)
            .then(() => {
                setRubricas(rubricas.filter(r => r.id !== id));
                setShowDeleteModal(false);
            })
            .catch(err => console.error("Error al eliminar rúbrica:", err));
    };

    return (
        <section>
            <Card className="m-4 p-2">
                <Card.Title>Grupo de rúbricas</Card.Title>
                <Card.Body>
                    <Table>
                        <thead className="text-center">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {rubricas.map(r => (
                                <tr key={r.id}>
                                    <td>{r.codigo}</td>
                                    <td>{r.nombre}</td>
                                    <td>
                                        <span className={
                                            r.estado === "1" ? "badge bg-success" :
                                            r.estado === "2" ? "badge bg-danger" : "badge bg-secondary"
                                        }>
                                            {r.estado === "1" ? "Activo" : r.estado === "2" ? "Inactivo" : "Desconocido"}
                                        </span>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle>...</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => { setSelectedRubrica(r); setShowViewModal(true); }}>Ver</Dropdown.Item>
                                                <Dropdown.Item onClick={() => { setDeleteId(r.id); setShowDeleteModal(true); }}>Eliminar</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => setShowAddModal(true)}>Añadir Rúbrica</Button>
                </Card.Body>
            </Card>

            <AddRubrica show={showAddModal} onHide={() => setShowAddModal(false)} onSave={handleAddRubrica} />
            <DeleteRubrica show={showDeleteModal} onHide={() => setShowDeleteModal(false)} onDelete={() => handleDeleteRubrica(deleteId)} />
            <ViewRubrica show={showViewModal} onHide={() => setShowViewModal(false)} rubrica={selectedRubrica} />
        </section>
    );
}