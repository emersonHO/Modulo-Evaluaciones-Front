import React from 'react';
import { RubricaItem } from './RubricaItem';
import { Typography } from '@mui/material';

export const TablaRubricas = ({ rubricas, onVer, onEditar, onEliminar }) => {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Listado de Rúbricas</Typography>
      {
        rubricas.length === 0
          ? <Typography variant="body2">No hay rúbricas registradas.</Typography>
          : rubricas.map((rubrica) => (
              <RubricaItem
                key={rubrica.id}
                rubrica={rubrica}
                onVer={onVer}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            ))
      }
    </div>
  );
};
