import { TextField, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const CriteriosForm = ({ onGuardar, criterioSeleccionado, onCancelar }) => {
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (criterioSeleccionado) {
      setDescripcion(criterioSeleccionado.descripcion || '');
    }
  }, [criterioSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descripcion.trim() === '') return;

    const nuevoCriterio = {
      ...criterioSeleccionado,
      descripcion,
    };

    onGuardar(nuevoCriterio);
    setDescripcion('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Descripción del Criterio"
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button type="submit" variant="contained" color="primary">
          {criterioSeleccionado ? 'Actualizar' : 'Agregar'}
        </Button>
        {criterioSeleccionado && (
          <Button variant="outlined" color="secondary" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </Box>
    </Box>
  );
};
