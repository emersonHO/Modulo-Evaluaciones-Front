import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Stack,
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Zoom } from "@mui/material";
import PropTypes from "prop-types";
import { Autocomplete } from "@mui/lab";
import { useEffect, useState } from "react";

export const EditarComponenteDialog = ({
  open,
  onClose,
  formData,
  setFormData,
  componentesUnicos = [],
  onSave,
  editingComponente,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [componentesValidos, setComponentesValidos] = useState([]);

  useEffect(() => {
    console.log("Componentes recibidos:", componentesUnicos);
    const validos = Array.isArray(componentesUnicos) ? componentesUnicos : [];
    setComponentesValidos(validos);
  }, [componentesUnicos]);

  const handleInputChange = (event, newValue) => {
    console.log("Input cambiado:", newValue);
    setInputValue(newValue);
  };

  const handleChange = (event, newValue) => {
    console.log("Valor seleccionado:", newValue);
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        id: newValue.id || "",
        descripcion: newValue.descripcion || "",
        peso: newValue.peso || "",
      }));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Zoom}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6">
          {editingComponente ? "Editar componente" : "Agregar componente"}
        </Typography>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 100,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={3}>
            <FormControl fullWidth>
              <Autocomplete
                options={componentesValidos}
                getOptionLabel={(option) => option?.descripcion || ""}
                filterOptions={(options, { inputValue }) => {
                  const searchTerm = inputValue.toLowerCase().trim();
                  if (!searchTerm) return options;
                  return options.filter((option) =>
                    option?.descripcion?.toLowerCase().includes(searchTerm)
                  );
                }}
                value={
                  componentesValidos.find(
                    (c) => String(c?.id) === String(formData.id)
                  ) || null
                }
                onChange={handleChange}
                onInputChange={handleInputChange}
                inputValue={inputValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nombre del componente"
                    variant="outlined"
                    placeholder="Escribe para buscar componentes..."
                  />
                )}
                noOptionsText="No se encontraron componentes"
                loadingText="Cargando componentes..."
                freeSolo={false}
                autoComplete
                includeInputInList
                blurOnSelect
                loading={isLoading}
                disabled={isLoading}
              />
            </FormControl>

            <TextField
              fullWidth
              label="Peso del componente"
              type="number"
              value={
                formData.peso === null || formData.peso === undefined
                  ? ""
                  : formData.peso
              }
              InputProps={{
                readOnly: !(
                  formData.peso === null || formData.peso === undefined
                ),
              }}
              onChange={
                formData.peso === null || formData.peso === undefined
                  ? (e) =>
                      setFormData((prev) => ({ ...prev, peso: e.target.value }))
                  : undefined
              }
              placeholder={
                formData.peso === null || formData.peso === undefined
                  ? "Ingrese el peso"
                  : ""
              }
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{ borderRadius: 2 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={onSave}
                sx={{ borderRadius: 2 }}
              >
                Guardar
              </Button>
            </Box>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

EditarComponenteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    descripcion: PropTypes.string,
    peso: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  componentesUnicos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      descripcion: PropTypes.string,
      peso: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onSave: PropTypes.func.isRequired,
  editingComponente: PropTypes.object,
  isLoading: PropTypes.bool,
};
