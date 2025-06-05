import { useEffect, useState } from "react";
import {
    Button,
    Typography,
    Box,
    Container,
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddComponente from "./addComponente";
import ComponenteViewer from "./viewComponente";
import { componenteService } from "../../../services/componenteService";

export default function GrupoComponentes() {
    const navigate = useNavigate();
    const [componentes, setComponentes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedComponente, setSelectedComponente] = useState(null);
    const [componenteAEliminar, setComponenteAEliminar] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const [newComponente, setNewComponente] = useState({
        codigo: "",
        descripcion: "",
        evaluacionid: "",
        peso: "",
        cursoid: "",
        orden: "",
        padreid: "",
        nivel: "",
        calculado: "false",
        formulaid: ""
    });

    useEffect(() => {
        const fetchComponentes = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("http://localhost:8080/componentes");
                const data = await res.json();
                setComponentes(data);
                setError(null);
            } catch (err) {
                setError("Error al cargar los componentes. Por favor, intente más tarde.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchComponentes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComponente(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await componenteService.createComponente(newComponente);
            setShowAddModal(false);
            setNewComponente({
                codigo: "",
                descripcion: "",
                evaluacionid: "",
                peso: "",
                cursoid: "",
                orden: "",
                padreid: "",
                nivel: "",
                calculado: "false",
                formulaid: ""
            });
            fetchComponentes();
            setSnackbar({
                open: true,
                message: "Componente guardado exitosamente",
                severity: "success"
            });
        } catch (err) {
            console.error("Error al guardar el componente:", err);
            setSnackbar({
                open: true,
                message: "Error al guardar el componente",
                severity: "error"
            });
        }
    };

    const handleDeleteComponente = (componente) => {
        setComponenteAEliminar(componente);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (componenteAEliminar) {
            try {
                await componenteService.deleteComponente(componenteAEliminar.id);
                setSnackbar({
                    open: true,
                    message: "Componente eliminado exitosamente",
                    severity: "success"
                });
                fetchComponentes();
            } catch (err) {
                console.error("Error al eliminar el componente:", err);
                setSnackbar({
                    open: true,
                    message: "Error al eliminar el componente",
                    severity: "error"
                });
            }
            setShowDeleteDialog(false);
            setComponenteAEliminar(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
        setComponenteAEliminar(null);
    };

    const openViewer = (comp) => {
        setSelectedComponente(comp);
        setShowViewModal(true);
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gestión de Componentes
                </Typography>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowAddModal(true)}
                        sx={{ mb: 3 }}
                    >
                        Añadir Componente
                    </Button>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Evaluación ID</TableCell>
                                    <TableCell>Curso ID</TableCell>
                                    <TableCell>Orden</TableCell>
                                    <TableCell>Calculado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {componentes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            No hay componentes disponibles
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    componentes.map(comp => (
                                        <TableRow key={comp.id}>
                                            <TableCell>{comp.codigo}</TableCell>
                                            <TableCell>{comp.descripcion}</TableCell>
                                            <TableCell>{comp.peso}</TableCell>
                                            <TableCell>{comp.evaluacionid}</TableCell>
                                            <TableCell>{comp.cursoid}</TableCell>
                                            <TableCell>{comp.orden}</TableCell>
                                            <TableCell>{comp.calculado === "true" ? "Sí" : "No"}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<DeleteIcon />}
                                                    onClick={() => handleDeleteComponente(comp)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}

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

            <Dialog
                open={showDeleteDialog}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro que desea eliminar este componente? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancelar</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

