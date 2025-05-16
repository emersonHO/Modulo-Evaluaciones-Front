import axios from "axios";

export const evaluacionesApi = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout de 10 segundos
});

// Interceptor para agregar el token de autenticación
evaluacionesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error("Error en la configuración de la petición:", error);
  return Promise.reject(error);
});

// Interceptor para manejar errores
evaluacionesApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error("Timeout en la petición al servidor");
      throw new Error("No se pudo conectar con el servidor. Tiempo de espera agotado.");
    }
    
    if (!error.response) {
      console.error("Error de red:", error);
      throw new Error("No se pudo conectar con el servidor. Verifica tu conexión a internet y que el servidor esté corriendo.");
    }

    console.error("Error en la respuesta del servidor:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers
    });

    throw error;
  }
);
