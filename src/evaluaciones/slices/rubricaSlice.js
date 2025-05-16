import { createSlice } from '@reduxjs/toolkit';

export const rubricaSlice = createSlice({
  name: 'rubrica',
  initialState: {
    rubricas: [],
    rubricaActiva: null,
    estaCargandoRubricas: false,
  },
  reducers: {
    iniciaCargaRubricas: (state) => {
      state.estaCargandoRubricas = true;
    },
    cargaRubricas: (state, action) => {
      state.rubricas = action.payload.rubricas;
      state.estaCargandoRubricas = false;
    },
    cargaRubricaActiva: (state, action) => {
      state.rubricaActiva = action.payload;
    },
    agregaNuevaRubrica: (state, action) => {
      state.rubricas.push(action.payload);
    },
    actualizaRubrica: (state, action) => {
      state.rubricas = state.rubricas.map((rubrica) =>
        rubrica.id === action.payload.id ? action.payload : rubrica
      );
    },
    eliminaRubrica: (state, action) => {
      state.rubricas = state.rubricas.filter((rubrica) => rubrica.id !== action.payload);
    },
  },
});

export const {
  iniciaCargaRubricas,
  cargaRubricas,
  cargaRubricaActiva,
  agregaNuevaRubrica,
  actualizaRubrica,
  eliminaRubrica,
} = rubricaSlice.actions;