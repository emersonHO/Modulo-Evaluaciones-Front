import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";

export function ComponenteCompetenciaCard({
  componente,
  onEdit,
  onDelete,
  onAddCompetencias,
}) {
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

  return (
    <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" color="primary" sx={{ mb: 0.5 }}>
              {componente.descripcion}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Peso:
              </Typography>
              <Chip label={`${componente.peso || 0}%`} size="small" />
            </Box>
          </Box>
          <MenuOpciones
            onEdit={() => onEdit(componente)}
            onDelete={() => onDelete(componente.descripcion)}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Competencias asociadas:
        </Typography>
        {componente.competencias && componente.competencias.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {componente.competencias.map((comp) => (
              <Chip
                key={comp.id}
                label={comp.nombre}
                size="small"
                sx={{ m: 0.5 }}
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            Sin competencias asociadas
          </Typography>
        )}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Chip
            label={"+ ASOCIAR"}
            color="primary"
            clickable
            onClick={() => onAddCompetencias(componente)}
            sx={{ fontWeight: 600, letterSpacing: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function MenuOpciones({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenuOpen} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onEdit();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            onDelete();
          }}
        >
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
}

MenuOpciones.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

ComponenteCompetenciaCard.propTypes = {
  componente: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddCompetencias: PropTypes.func.isRequired,
};

export default ComponenteCompetenciaCard;
