import React, { useEffect, useState } from "react";
import axios from "axios";
import AddComponente from "./addComponente";
import ComponenteViewer from "./viewComponente";
import { Button, Table } from "react-bootstrap";

export default function GrupoComponentes() {
    const [componentes, setComponentes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedComponente, setSelectedComponente] = useState(null);
    const [newComponente, setNewComponente] = useState({
        codigo: "",
        nombre: "",
        descripcion: ""
    });

    useEffect(() => {
        fetchComponentes();
    }, []);

    const fetchComponentes = () => {
        axios.get("http://localhost:8080/api/componente")
            .then(res => setComponentes(res.data))
            .catch(err => console.error("Error al obtener componentes:", err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComponente(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        axios.post("http://localhost:8080/api/componente", newComponente)
            .then(() => {
                setShowAddModal(false);
                setNewComponente({ codigo: "", nombre: "", descripcion: "" });
                fetchComponentes();
            })
            .catch(err => console.error("Error al guardar el componente:", err));
    };

    const openViewer = (comp) => {
        setSelectedComponente(comp);
        setShowViewModal(true);
    };

    return (
        <div className="container mt-4">
            <h3>Gestión de Componentes</h3>
            <Button className="mb-3" onClick={() => setShowAddModal(true)}>
                Añadir Componente
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {componentes.map(comp => (
                        <tr key={comp.id}>
                            <td>{comp.codigo}</td>
                            <td>{comp.nombre}</td>
                            <td>{comp.descripcion}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => openViewer(comp)}>
                                    Ver
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <AddComponente
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                handleSave={handleSave}
                newComponente={newComponente}
                handleChange={handleChange}
            />

            <ComponenteViewer
                show={showViewModal}
                handleClose={() => setShowViewModal(false)}
                componente={selectedComponente}
            />
        </div>
    );
}
