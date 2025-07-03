import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Fade,
  Grow,
  Zoom,
  Divider,
  Alert,
  Snackbar,
  Paper,
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ComponenteCompetenciaCard } from "./ComponenteCompetenciaCard";
import { EditarComponenteDialog } from "./dialogs/EditarComponenteDialog";
import { CompetenciasDialog } from "./dialogs/CompetenciasDialog";
import { useComponentes } from "./hooks/useComponentes";
import { useCompetencias } from "./hooks/useCompetencias";
import BotoneraAcciones from "./ui/BotoneraAcciones";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const AsociarComponentesPage = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingComponente, setEditingComponente] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: "",
    peso: "",
    id: "",
  });
  const [openCompetenciasDialog, setOpenCompetenciasDialog] = useState(false);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [componenteAEliminar, setComponenteAEliminar] = useState(null);

  const {
    componentes,
    error,
    componentesDisponibles,
    handleDelete,
    handleSave,
    handleGuardarCambios,
    actualizarComponente,
    isLoading,
  } = useComponentes();

  const {
    competenciasDisponibles,
    competenciasSeleccionadas,
    cargarCompetencias,
    handleToggleCompetencia,
    setCompetenciasIniciales,
    resetCompetencias,
  } = useCompetencias();

  const handleOpenDialog = (componente = null) => {
    if (componente) {
      setEditingComponente(componente);
      setFormData({
        id: componente.idComponente || componente.id,
        descripcion: componente.descripcion,
        peso: componente.peso,
      });
    } else {
      setEditingComponente(null);
      setFormData({
        id: "",
        descripcion: "",
        peso: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingComponente(null);
    setFormData({
      descripcion: "",
      peso: "",
      id: "",
    });
  };

  const handleSaveComponente = async () => {
    if (editingComponente) {
      actualizarComponente(
        editingComponente.idComponente || editingComponente.id,
        {
          ...editingComponente,
          ...formData,
        }
      );
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: "Componente actualizado localmente",
        severity: "success",
      });
    } else {
      const nuevoComponente = {
        id: formData.id,
        descripcion: formData.descripcion,
        peso: formData.peso,
        competencias: [],
      };
      if (
        !componentes.some((c) => String(c.id) === String(nuevoComponente.id))
      ) {
        componentes.push(nuevoComponente);
      }
      handleCloseDialog();
      setSnackbar({
        open: true,
        message: "Componente agregado localmente",
        severity: "success",
      });
    }
  };

  const handleDeleteComponente = async (idComponente) => {
    setComponenteAEliminar(idComponente);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (componenteAEliminar) {
      const result = await handleDelete(componenteAEliminar);
      setSnackbar({
        open: true,
        message: result.message,
        severity: result.success ? "success" : "error",
      });
      setComponenteAEliminar(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setComponenteAEliminar(null);
    setOpenDeleteDialog(false);
  };

  const handleOpenCompetenciasDialog = async (componente) => {
    setComponenteSeleccionado(componente);
    setCompetenciasIniciales(componente.competencias);
    const result = await cargarCompetencias();
    if (result.success) {
      setOpenCompetenciasDialog(true);
    } else {
      setSnackbar({
        open: true,
        message: result.message,
        severity: "error",
      });
    }
  };

  const handleCloseCompetenciasDialog = () => {
    setOpenCompetenciasDialog(false);
    setComponenteSeleccionado(null);
    resetCompetencias();
  };

  const handleGuardarCompetencias = () => {
    if (componenteSeleccionado) {
      actualizarComponente(
        componenteSeleccionado.id || componenteSeleccionado.idComponente,
        {
          ...componenteSeleccionado,
          competencias: competenciasSeleccionadas,
        }
      );
      handleCloseCompetenciasDialog();
    }
  };

  const handleGuardarTodosLosCambios = async () => {
    const componentesAGuardar = componentes.filter(
      (c) => c.competencias && c.competencias.length > 0
    );
    if (componentesAGuardar.length === 0) {
      setSnackbar({
        open: true,
        message: "No hay componentes con competencias para guardar.",
        severity: "warning",
      });
      return;
    }
    try {
      let exito = true;
      for (const componente of componentesAGuardar) {
        for (const competencia of componente.competencias) {
          const body = {
            componenteId: Number(componente.id),
            competenciaId: Number(competencia.id),
            peso: Number(componente.peso),
          };

          if (
            isNaN(body.componenteId) ||
            isNaN(body.competenciaId) ||
            isNaN(body.peso)
          ) {
            console.error("Datos inválidos:", {
              componente,
              competencia,
              body,
            });
            exito = false;
            continue;
          }

          console.log("Enviando datos:", {
            body,
            componenteId: componente.id,
            competenciaId: competencia.id,
            peso: componente.peso,
            tipos: {
              componenteId: typeof body.componenteId,
              competenciaId: typeof body.competenciaId,
              peso: typeof body.peso,
            },
          });

          const response = await fetch(
            "http://localhost:8080/api/componente-competencia",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Error en la respuesta:", {
              status: response.status,
              statusText: response.statusText,
              errorData,
              bodyEnviado: body,
            });
            exito = false;
          }
        }
      }
      if (exito) {
        setSnackbar({
          open: true,
          message: "Cambios guardados exitosamente.",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Error al guardar uno o más componentes.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error al guardar los cambios.",
        severity: "error",
      });
    }
  };

  const componentesUnicos = componentesDisponibles.filter(
    (comp, index, self) =>
      index === self.findIndex((c) => c.descripcion === comp.descripcion)
  );

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Fade in={true}>
          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("../")}
              sx={{ mb: 2 }}
            >
              Ir a inicio
            </Button>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                bgcolor: "error.light",
                color: "error.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">{error}</Typography>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                sx={{ ml: 2 }}
              >
                Reintentar
              </Button>
            </Paper>
          </Box>
        </Fade>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("../")}
            sx={{ mb: 3 }}
          >
            Ir a inicio
          </Button>

          <Grow in={true}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "primary.main",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                ASOCIAR COMPONENTES A COMPETENCIAS
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          </Grow>

          <Zoom in={true}>
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={3}>
                {(componentes || []).map((componente) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={componente.idComponente || componente.id}
                  >
                    <ComponenteCompetenciaCard
                      componente={componente}
                      onEdit={handleOpenDialog}
                      onDelete={() => handleDeleteComponente(componente.id)}
                      onAddCompetencias={handleOpenCompetenciasDialog}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Zoom>

          <BotoneraAcciones
            onAgregar={() => handleOpenDialog()}
            onGuardar={handleGuardarTodosLosCambios}
            agregarDisabled={isLoading}
          />

          <EditarComponenteDialog
            open={openDialog}
            onClose={handleCloseDialog}
            formData={formData}
            setFormData={setFormData}
            componentesUnicos={componentesUnicos}
            onSave={handleSaveComponente}
            editingComponente={editingComponente}
            error={error}
            isLoading={isLoading}
          >
            <Autocomplete
              options={componentesUnicos}
              getOptionLabel={(option) =>
                `${option.descripcion} (${option.peso}%)`
              }
              filterOptions={(options, { inputValue }) => {
                if (inputValue.length < 3) {
                  return [];
                }
                return options.filter(
                  (option) =>
                    option.descripcion
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()) ||
                    String(option.peso).includes(inputValue)
                );
              }}
              value={
                componentesUnicos.find(
                  (c) => String(c.id) === String(formData.id)
                ) || null
              }
              onChange={(event, newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  id: newValue ? newValue.id : "",
                  descripcion: newValue ? newValue.descripcion : "",
                  peso: newValue ? newValue.peso : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nombre del componente"
                  placeholder="Escribe al menos 3 letras para buscar..."
                  helperText="El peso del componente se mostrará al seleccionarlo"
                />
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              noOptionsText="Escribe al menos 3 letras para buscar componentes"
            />
          </EditarComponenteDialog>

          <CompetenciasDialog
            open={openCompetenciasDialog}
            onClose={handleCloseCompetenciasDialog}
            competenciasDisponibles={competenciasDisponibles}
            competenciasSeleccionadas={competenciasSeleccionadas}
            onToggleCompetencia={handleToggleCompetencia}
            onGuardar={handleGuardarCompetencias}
          />

          <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
            <DialogTitle>¿Está seguro de eliminar este componente?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Esta acción no se puede deshacer.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmDelete}
                color="error"
                variant="contained"
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Container>
  );
};

export default AsociarComponentesPage;
