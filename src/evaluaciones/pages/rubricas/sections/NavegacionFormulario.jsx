import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const pasos = ['Datos Rúbrica', 'Criterios', 'Niveles'];

export const NavegacionFormulario = ({
  pasoActivo,
  avanzarPaso,
  retrocederPaso,
  maxPasos,
  onSubmit
}) => {
  return (
    <>
      <Stepper activeStep={pasoActivo} alternativeLabel sx={{ mb: 2 }}>
        {pasos.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={retrocederPaso}
          disabled={pasoActivo === 0}
        >
          Anterior
        </Button>

        {pasoActivo < maxPasos - 1 ? (
          <Button variant="contained" onClick={avanzarPaso}>
            Siguiente
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={onSubmit}>
            Guardar Rúbrica
          </Button>
        )}
      </Box>
    </>
  );
};
