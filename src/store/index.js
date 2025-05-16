import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../seguridad/slices";
import competenciaReducer from "../evaluaciones/slices/competenciaSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    competencia: competenciaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
