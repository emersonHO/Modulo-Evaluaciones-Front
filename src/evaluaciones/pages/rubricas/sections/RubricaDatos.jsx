import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

export const RubricaDatos = ({ rubrica, setRubrica }) => {

  const handleChange = (e) => {
    setRubrica({
      ...rubrica,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Datos generales de la Rúbrica
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre de la Rúbrica"
            name="nombre"
            value={rubrica.nombre}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descripción"
            name="descripcion"
            value={rubrica.descripcion}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Curso ID"
            name="cursoid"
            value={rubrica.cursoid}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
