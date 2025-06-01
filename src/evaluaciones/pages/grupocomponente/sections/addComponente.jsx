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
        { value: 1, label: "Evaluación Escrita" },
        { value: 2, label: "Evaluación Oral" },
        { value: 3, label: "Rúbrica" },
        { value: 4, label: "Proyecto del Curso" }
    ];

    const cursoOptions = [
        { value: 1, label: "Análisis y Diseño de Software - G1 - 2023-I" },
        { value: 3, label: "Arquitecturas Modernas - G1 - 2023-I" },
        { value: 7, label: "Desarrollo de Software - G1 - 2023-II" },
        { value: 8, label: "Métodos y Técnicas de Diseño - G2 - 2023-II" },
        { value: 9, label: "Metodologías Ágiles - G1 - 2023-II" },
        { value: 20, label: "Métodos y Técnicas de Diseño - G1 - 2024-I" },
        { value: 21, label: "Arquitecturas Modernas - G2 - 2024-I" },
        { value: 22, label: "Análisis y Diseño de Software - G2 - 2024-I" },
        { value: 37, label: "TALLER DE CONSTRUCCIÓN DE SOFTWARE I" },
        { value: 38, label: "Arquitecturas Modernas - G1 - 2024-II" }
    ];

    const nivelOptions = [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" }
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