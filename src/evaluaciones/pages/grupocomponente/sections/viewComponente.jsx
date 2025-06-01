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
    Alert
} from "@mui/material";
import { useComponentes } from "../../componente-competencia/componente/hooks/useComponentes";

export default function ComponenteViewer({ show, handleClose, componente }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableComponente, setEditableComponente] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const { actualizarComponente } = useComponentes();

    useEffect(() => {
        if (componente) {
            setEditableComponente(componente);
            setIsEditing(false);
        }
    }, [componente]);

    const toggleEdit = () => setIsEditing(true);
    
    const cancelEdit = () => {
        setEditableComponente(componente);
        setIsEditing(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditableComponente(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            await actualizarComponente(editableComponente.id, editableComponente);
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

    if (!editableComponente) return null;

    return (
        <>
            <Dialog open={show} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {isEditing ? "Editar componente" : "Detalle del componente"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                        <TextField
                            label="Código"
                            name="codigo"
                            value={editableComponente.codigo}
                            onChange={handleChange}
                            disabled={!isEditing}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={editableComponente.nombre}
                            onChange={handleChange}
                            disabled={!isEditing}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={editableComponente.descripcion}
                            onChange={handleChange}
                            disabled={!isEditing}
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Box>
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
                    <Button onClick={handleClose} variant="outlined" color="inherit">
                        Cerrar
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
        </>
    );
}
