import { createSlice } from '@reduxjs/toolkit';

export const nivelCriterioSlice = createSlice({
  name: 'nivelCriterio',
  initialState: {
    niveles: [],
    nivelActivo: null,
    estaCargandoNiveles: false,
  },
  reducers: {
    iniciaCargaNiveles: (state) => {
      state.estaCargandoNiveles = true;
    },
    cargaNiveles: (state, action) => {
      state.niveles = action.payload.niveles;
      state.estaCargandoNiveles = false;
    },
    cargaNivelActivo: (state, action) => {
      state.nivelActivo = action.payload;
    },
    agregaNuevoNivel: (state, action) => {
      state.niveles.push(action.payload);
    },
    actualizaNivel: (state, action) => {
      state.niveles = state.niveles.map((nivel) =>
        nivel.id === action.payload.id ? action.payload : nivel
      );
    },
    eliminaNivel: (state, action) => {
      state.niveles = state.niveles.filter(
        (nivel) => nivel.id !== action.payload
      );
    },
  },
});

export const {
  iniciaCargaNiveles,
  cargaNiveles,
  cargaNivelActivo,
  agregaNuevoNivel,
  actualizaNivel,
  eliminaNivel,
} = nivelCriterioSlice.actions;