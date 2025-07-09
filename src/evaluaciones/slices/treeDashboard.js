import { createSlice } from '@reduxjs/toolkit'

export const arbolSlice = createSlice({
    name: "arbol",
    initialState: {
        status: '',
        arbolidActiva: null,
        arboles: [],
        estaCargandoArboles: false,
    },
    reducers: {
        iniciaCargaArboles: (state) => {
            state.estaCargandoArboles = true;
        },
        cargaArboles: ( state, action ) => {
            state.arboles = action.payload.arboles;
            state.estaCargandoArboles = false;
        },
        cargaArbolIdActiva: ( state, action ) => {
            state.arbolidActiva = action.payload.arbolidActivo;
        },
    }
});

export const { iniciaCargaArboles, cargaArboles, cargaArbolIdActiva } = arbolSlice.actions;