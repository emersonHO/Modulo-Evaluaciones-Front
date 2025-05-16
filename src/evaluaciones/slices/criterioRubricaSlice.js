import { createSlice } from '@reduxjs/toolkit';

export const criterioRubricaSlice = createSlice({
  name: 'criterioRubrica',
  initialState: {
    criterios: [],
    criterioActivo: null,
    estaCargandoCriterios: false,
  },
  reducers: {
    iniciaCargaCriterios: (state) => {
      state.estaCargandoCriterios = true;
    },
    cargaCriterios: (state, action) => {
      state.criterios = action.payload.criterios;
      state.estaCargandoCriterios = false;
    },
    cargaCriterioActivo: (state, action) => {
      state.criterioActivo = action.payload;
    },
    agregaNuevoCriterio: (state, action) => {
      state.criterios.push(action.payload);
    },
    actualizaCriterio: (state, action) => {
      state.criterios = state.criterios.map((criterio) =>
        criterio.id === action.payload.id ? action.payload : criterio
      );
    },
    eliminaCriterio: (state, action) => {
      state.criterios = state.criterios.filter(
        (criterio) => criterio.id !== action.payload
      );
    },
  },
});

export const {
  iniciaCargaCriterios,
  cargaCriterios,
  cargaCriterioActivo,
  agregaNuevoCriterio,
  actualizaCriterio,
  eliminaCriterio,
} = criterioRubricaSlice.actions;
