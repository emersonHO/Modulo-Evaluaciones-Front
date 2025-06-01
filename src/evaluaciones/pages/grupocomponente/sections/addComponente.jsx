import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from "@mui/material";

const AddComponente = ({ show, handleClose, handleSave, newComponente, handleChange }) => {
    const evaluacionOptions = [
        { value: 1, label: "Evaluación 1" },
        { value: 2, label: "Evaluación 2" },
        { value: 3, label: "Evaluación 3" },
        { value: 4, label: "Evaluación 4" }
    ];

    const cursoOptions = [
        { value: 1, label: "Curso 1" },
        { value: 3, label: "Curso 3" },
        { value: 7, label: "Curso 7" },
        { value: 8, label: "Curso 8" },
        { value: 9, label: "Curso 9" },
        { value: 20, label: "Curso 20" },
        { value: 21, label: "Curso 21" },
        { value: 22, label: "Curso 22" },
        { value: 37, label: "Curso 37" },
        { value: 38, label: "Curso 38" }
    ];

    const nivelOptions = [
        { value: 1, label: "Nivel 1" },
        { value: 2, label: "Nivel 2" },
        { value: 3, label: "Nivel 3" },
        { value: 4, label: "Nivel 4" }
    ];

    return (
        <Dialog
            open={show}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>Añadir Nuevo Componente</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Código"
                            name="codigo"
                            value={newComponente.codigo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descripción"
                            name="descripcion"
                            multiline
                            rows={2}
                            value={newComponente.descripcion}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Evaluación</InputLabel>
                            <Select
                                name="evaluacionid"
                                value={newComponente.evaluacionid}
                                onChange={handleChange}
                                label="Evaluación"
                            >
                                {evaluacionOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Peso"
                            name="peso"
                            type="number"
                            inputProps={{ step: "0.01" }}
                            value={newComponente.peso}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Curso</InputLabel>
                            <Select
                                name="cursoid"
                                value={newComponente.cursoid}
                                onChange={handleChange}
                                label="Curso"
                            >
                                {cursoOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Orden"
                            name="orden"
                            type="number"
                            value={newComponente.orden}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID Padre"
                            name="padreid"
                            type="number"
                            value={newComponente.padreid}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Nivel</InputLabel>
                            <Select
                                name="nivel"
                                value={newComponente.nivel}
                                onChange={handleChange}
                                label="Nivel"
                            >
                                {nivelOptions.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Calculado</InputLabel>
                            <Select
                                name="calculado"
                                value={newComponente.calculado}
                                onChange={handleChange}
                                label="Calculado"
                            >
                                <MenuItem value="true">Sí</MenuItem>
                                <MenuItem value="false">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID Fórmula"
                            name="formulaid"
                            type="number"
                            value={newComponente.formulaid}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddComponente;