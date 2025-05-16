import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

export const NivelesForm = ({ niveles, setNiveles }) => {
  const [nuevoNivel, setNuevoNivel] = useState({ nombre: '', puntaje: '' });

  const handleChange = (e) => {
    setNuevoNivel({
      ...nuevoNivel,
      [e.target.name]: e.target.value,
    });
  };

  const agregarNivel = () => {
    if (nuevoNivel.nombre && nuevoNivel.puntaje) {
      setNiveles([...niveles, nuevoNivel]);
      setNuevoNivel({ nombre: '', puntaje: '' });
    }
  };

  const eliminarNivel = (index) => {
    const nuevos = niveles.filter((_, i) => i !== index);
    setNiveles(nuevos);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Niveles de logro
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre del nivel"
            name="nombre"
            fullWidth
            value={nuevoNivel.nombre}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Puntaje"
            name="puntaje"
            type="number"
            fullWidth
            value={nuevoNivel.puntaje}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" onClick={agregarNivel}>
            Agregar
          </Button>
        </Grid>
      </Grid>

      <Box mt={3}>
        {niveles.map((nivel, idx) => (
          <Box
            key={idx}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography>{`${nivel.nombre} - Puntaje: ${nivel.puntaje}`}</Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={() => eliminarNivel(idx)}
            >
              Eliminar
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
