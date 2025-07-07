import { createSlice } from "@reduxjs/toolkit";

export const componenteSlice = createSlice({
    name: "componente",
    initialState: {
        status: "idle",
        componenteActualizado: null,
        error: null
    },
    reducers: {
        iniciaActualizacionComponente: (state) => {
            state.status = "loading";
            state.error = null;
        },
        actualizacionComponenteExitosa: (state, action) => {
            state.status = "succeeded";
            state.componenteActualizado = action.payload;
        },
        actualizacionComponenteError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export const {
    iniciaActualizacionComponente,
    actualizacionComponenteExitosa,
    actualizacionComponenteError
} = componenteSlice.actions;

export default componenteSlice.reducer;