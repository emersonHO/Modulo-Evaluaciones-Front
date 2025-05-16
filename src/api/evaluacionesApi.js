import axios from "axios";

export const evaluacionesApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token de autenticación
evaluacionesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
evaluacionesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la llamada API:", error.response?.data || error);
    throw error;
  }
);
