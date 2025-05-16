import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { RubricaDatos } from './sections/RubricaDatos';
import CriteriosRubrica  from './sections/CriteriosRubrica';
import NivelesPorCriterio from './sections/NivelesPorCriterio';
import { NavegacionFormulario } from './sections/NavegacionFormulario';

const pasos = [
  'Datos Generales',
  'Criterios',
  'Niveles por Criterio',
];

export const FormularioRubrica = () => {
  const [pasoActivo, setPasoActivo] = useState(0);

  const [rubrica, setRubrica] = useState({
    nombre: '',
    descripcion: '',
    cursoid: '',
    criterios: [],
  });

  const avanzarPaso = () => {
    if (pasoActivo < pasos.length - 1) {
      setPasoActivo(pasoActivo + 1);
    }
  };

  const retrocederPaso = () => {
    if (pasoActivo > 0) {
      setPasoActivo(pasoActivo - 1);
    }
  };

  const onSubmitRubrica = () => {
    console.log('Rubrica a guardar:', rubrica);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Registrar Rúbrica</Typography>

      {pasoActivo === 0 && (
        <RubricaDatos rubrica={rubrica} setRubrica={setRubrica} />
      )}

      {pasoActivo === 1 && (
        <CriteriosRubrica rubrica={rubrica} setRubrica={setRubrica} />
      )}

      {pasoActivo === 2 && (
        <NivelesPorCriterio rubrica={rubrica} setRubrica={setRubrica} />
      )}

      <Box mt={3}>
        <NavegacionFormulario
          pasoActivo={pasoActivo}
          avanzarPaso={avanzarPaso}
          retrocederPaso={retrocederPaso}
          maxPasos={pasos.length}
          onSubmit={onSubmitRubrica}
        />
      </Box>
    </Box>
  );
};
