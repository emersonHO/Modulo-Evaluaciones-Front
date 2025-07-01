import { useState, useEffect } from "react";

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
      const response = await fetch(
        "http://localhost:8080/api/componentes-no-asociados"
      );
      const data = await response.json();
      const componentesFormateados = data.map((comp) => ({
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
        const response = await fetch(
          `http://localhost:8080/api/componente-competencia/${editingComponente.idComponente}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        setComponentes((prev) =>
          prev.map((c) =>
            c.idComponente === editingComponente.idComponente ? data : c
          )
        );
        setComponentesDisponibles((prev) =>
          prev.map((c) =>
            c.idComponente === editingComponente.idComponente ? data : c
          )
        );
        return {
          success: true,
          message: "Componente actualizado exitosamente",
        };
      } else {
        // Crear nuevo componente
        const response = await fetch(
          "http://localhost:8080/api/componente-competencia",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        setComponentes((prev) => [...prev, data]);
        setComponentesDisponibles((prev) => [...prev, data]);
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
      const response = await fetch(
        "http://localhost:8080/api/componente-competencia/guardar-cambios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(componentes),
        }
      );
      await response.json();
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
