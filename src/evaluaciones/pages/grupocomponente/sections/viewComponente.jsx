import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Snackbar,
    Alert,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import { useComponentes } from "../../componente-competencia/componente/hooks/useComponentes";
import axios from "axios";

const ComponenteViewer = ({ show, handleClose, componente }) => {
    const [componentes, setComponentes] = useState([]);
    const [editedComponente, setEditedComponente] = useState(componente || {});
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const { actualizarComponente } = useComponentes();

    useEffect(() => {
        const fetchComponentes = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/componentes");
                setComponentes(res.data);
            } catch (err) {
                console.error("Error cargando componentes:", err);
                setSnackbar({
                    open: true,
                    message: "Error al cargar los componentes",
                    severity: "error"
                });
            }
        };
        if (show) {
            fetchComponentes();
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedComponente(prev => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => setIsEditing(true);
    
    const cancelEdit = () => {
        setEditedComponente(componente);
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            await actualizarComponente(editedComponente.id, editedComponente);
            setIsEditing(false);
            handleClose();
            setSnackbar({
                open: true,
                message: "Componente actualizado exitosamente",
                severity: "success"
            });
        } catch (err) {
            console.error("Error al actualizar el componente:", err);
            setSnackbar({
                open: true,
                message: "Error al actualizar el componente",
                severity: "error"
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    if (!componente) return null;

    return (
        <>
            <Dialog
                open={show}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Detalles del Componente</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Evaluación ID</TableCell>
                                    <TableCell>Curso ID</TableCell>
                                    <TableCell>Orden</TableCell>
                                    <TableCell>Nivel</TableCell>
                                    <TableCell>Calculado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {componentes.map((comp) => (
                                    <TableRow key={comp.id}>
                                        <TableCell>{comp.codigo}</TableCell>
                                        <TableCell>{comp.descripcion}</TableCell>
                                        <TableCell>{comp.peso}</TableCell>
                                        <TableCell>{comp.evaluacionid}</TableCell>
                                        <TableCell>{comp.cursoid}</TableCell>
                                        <TableCell>{comp.orden}</TableCell>
                                        <TableCell>{comp.nivel}</TableCell>
                                        <TableCell>{comp.calculado ? "Sí" : "No"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    {isEditing ? (
                        <>
                            <Button onClick={cancelEdit} color="inherit">
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} variant="contained" color="primary">
                                Guardar
                            </Button>
                        </>
                    ) : (
                        <Button onClick={toggleEdit} variant="contained" color="warning">
                            Editar
                        </Button>
                    )}
                    <Button onClick={handleClose}>Cerrar</Button>
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
        </>
    );
};

export default ComponenteViewer;