import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

export const RubricaItem = ({ rubrica, onVer, onEditar, onEliminar }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{rubrica.nombre}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {rubrica.descripcion}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" size="small" onClick={() => onVer(rubrica)}>Ver</Button>
          <Button variant="outlined" size="small" onClick={() => onEditar(rubrica)}>Editar</Button>
          <Button variant="text" color="error" size="small" onClick={() => onEliminar(rubrica.id)}>Eliminar</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
