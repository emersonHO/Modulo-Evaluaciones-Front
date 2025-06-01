import { useState } from "react";
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
    Typography
} from "@mui/material";
import { useComponentes } from "../../componente-competencia/componente/hooks/useComponentes";

const ComponenteViewer = ({ show, handleClose, componente }) => {
    const [editedComponente, setEditedComponente] = useState(componente || {});
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const { actualizarComponente } = useComponentes();

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
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Código</Typography>
                            <Typography variant="body1">{componente.codigo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Descripción</Typography>
                            <Typography variant="body1">{componente.descripcion}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Evaluación ID</Typography>
                            <Typography variant="body1">{componente.evaluacionid}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Peso</Typography>
                            <Typography variant="body1">{componente.peso}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Curso ID</Typography>
                            <Typography variant="body1">{componente.cursoid}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Orden</Typography>
                            <Typography variant="body1">{componente.orden}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">ID Padre</Typography>
                            <Typography variant="body1">{componente.padreid || "Ninguno"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Nivel</Typography>
                            <Typography variant="body1">{componente.nivel}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Calculado</Typography>
                            <Typography variant="body1">{componente.calculado ? "Sí" : "No"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">ID Fórmula</Typography>
                            <Typography variant="body1">{componente.formulaid || "Ninguno"}</Typography>
                        </Grid>
                    </Grid>
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