import { useState, useEffect } from "react";
import axios from "axios";

export const useComponentes = () => {
  const [componentes, setComponentes] = useState([]);
  const [componentesDisponibles, setComponentesDisponibles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cargarComponentes();
  }, []);

  const cargarComponentes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/componentes-no-asociados"
      );
      const componentesFormateados = response.data.map((comp) => ({
        id: comp.id || comp.idComponente,
        descripcion: comp.nombre || comp.descripcion || "",
        peso: comp.peso || 0,
        competencias: comp.competencias || [],
      }));
      setComponentesDisponibles(componentesFormateados);
      setError(null);
      return {
        success: true,
        message: "Componentes cargados exitosamente",
        data: componentesFormateados,
      };
    } catch (error) {
      setError(
        "Error al cargar los componentes. Por favor, intente nuevamente."
      );
      return {
        success: false,
        message: "Error al cargar los componentes",
        error: error.message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData, editingComponente) => {
    try {
      if (editingComponente) {
        // Actualizar componente existente
        const response = await axios.put(
          `http://localhost:8080/api/componente-competencia/${editingComponente.idComponente}`,
          formData
        );
        setComponentes((prev) =>
          prev.map((c) =>
            c.idComponente === editingComponente.idComponente
              ? response.data
              : c
          )
        );
        setComponentesDisponibles((prev) =>
          prev.map((c) =>
            c.idComponente === editingComponente.idComponente
              ? response.data
              : c
          )
        );
        return {
          success: true,
          message: "Componente actualizado exitosamente",
        };
      } else {
        // Crear nuevo componente
        const response = await axios.post(
          "http://localhost:8080/api/componente-competencia",
          formData
        );
        setComponentes((prev) => [...prev, response.data]);
        setComponentesDisponibles((prev) => [...prev, response.data]);
        return {
          success: true,
          message: "Componente creado exitosamente",
        };
      }
    } catch (error) {
      return {
        success: false,
        message:
          "Error al guardar el componente. Por favor, intente nuevamente.",
      };
    }
  };

  const handleDelete = async (idComponente) => {
    setComponentes((prev) =>
      prev.filter((c) => String(c.id) !== String(idComponente))
    );
    setComponentesDisponibles((prev) =>
      prev.filter((c) => String(c.id) !== String(idComponente))
    );
    return {
      success: true,
      message: "Componente ocultado exitosamente",
    };
  };

  const handleGuardarCambios = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/componente-competencia/guardar-cambios",
        componentes
      );
      return {
        success: true,
        message: "Cambios guardados exitosamente",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al guardar los cambios. Por favor, intente nuevamente.",
      };
    }
  };

  const actualizarComponente = (id, nuevoComponente) => {
    setComponentes((prev) =>
      prev.map((c) =>
        String(c.id) === String(id) ? { ...c, ...nuevoComponente } : c
      )
    );
  };

  return {
    componentes,
    componentesDisponibles,
    error,
    handleSave,
    handleDelete,
    handleGuardarCambios,
    setComponentes,
    cargarComponentes,
    isLoading,
    actualizarComponente,
  };
};
