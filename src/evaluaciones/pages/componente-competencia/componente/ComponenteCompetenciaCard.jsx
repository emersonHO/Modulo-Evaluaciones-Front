import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { ConfirmarEliminacionDialog } from "./dialogs/ConfirmarEliminacionDialog";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import Tooltip from "@mui/material/Tooltip";

export function ComponenteCompetenciaCard({
  componente,
  onEdit,
  onDelete,
  onAddCompetencias,
  onSave,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  if (!componente) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No hay componentes asociados
        </Typography>
      </Box>
    );
  }

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    setAnchorEl(null);
  };

  const handleConfirmDelete = () => {
    onDelete(componente.descripcion);
    setOpenDeleteDialog(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    onEdit(componente);
    handleMenuClose();
  };

  return (
    <Card
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        "&:hover": {
          boxShadow: 4,
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h6" color="primary" gutterBottom>
              {componente.descripcion}
            </Typography>
          </Box>
          <IconButton onClick={handleMenuClick} size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 2,
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={handleEditClick}>Editar</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Eliminar</MenuItem>
        </Menu>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Competencias asociadas:
          </Typography>
          {componente.competencias && componente.competencias.length > 0 ? (
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {componente.competencias.map((competencia) => (
                <li
                  key={competencia.id}
                  style={{
                    background: "#f1f1f1",
                    borderRadius: 12,
                    marginBottom: 8,
                    padding: "6px 16px",
                    listStyle: "none",
                    fontSize: 15,
                  }}
                >
                  {competencia.descripcion}
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay competencias asociadas
            </Typography>
          )}
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
        >
          <Tooltip title="Agregar competencias" arrow>
            <Fab
              color="primary"
              aria-label="Agregar competencias"
              size="small"
              onClick={() => onAddCompetencias(componente)}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Tooltip title="Guardar cambios" arrow>
            <Fab
              color="success"
              aria-label="Guardar competencias"
              size="small"
              onClick={() => onSave(componente)}
              sx={{
                backgroundColor: "#388e3c",
                color: "#fff",
                "&:hover": { backgroundColor: "#256029" },
              }}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        </Box>
      </CardContent>

      <ConfirmarEliminacionDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="¿Está seguro de eliminar este componente con sus competencias asociadas?"
        message="Esta acción no se puede deshacer."
      />
    </Card>
  );
}

ComponenteCompetenciaCard.propTypes = {
  componente: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddCompetencias: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ComponenteCompetenciaCard;
