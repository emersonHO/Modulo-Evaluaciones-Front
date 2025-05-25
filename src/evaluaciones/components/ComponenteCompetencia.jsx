import React, { useEffect, useState } from "react";
import styles from "./ComponenteCompetencia.module.css";
import { componenteService } from "../services/componenteService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ComponenteCompetencia() {
  const navigate = useNavigate();
  const [componentes, setComponentes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    descripcion: "",
    peso: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComponentes();
  }, []);

  const fetchComponentes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await componenteService.getComponentesConPeso();
      console.log("Datos recibidos:", data);
      setComponentes(data || []);
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Respuesta del servidor:", error.response);
      console.error("Mensaje de error:", error.message);
      
      let mensajeError = "Error al cargar los componentes. ";
      if (error.response?.status === 404) {
        mensajeError += "No se encontró el recurso solicitado.";
      } else if (error.response?.status === 500) {
        mensajeError += "Error interno del servidor.";
      } else if (error.message.includes("Network Error")) {
        mensajeError += "No se pudo conectar con el servidor. Verifica que el servidor esté corriendo en http://localhost:8080";
      } else {
        mensajeError += error.response?.data?.message || error.message;
      }
      
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectComponente = (e) => {
    const selectedId = e.target.value;
    const selected = componentes.find(
      (c) => String(c.id) === String(selectedId)
    );
    setFormData((prev) => ({
      ...prev,
      id: selected ? selected.id : "",
      descripcion: selected ? selected.descripcion : "",
      peso: selected ? selected.peso : "",
    }));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Button onClick={() => navigate("../")}>Volver a inicio</Button>
        <div className={styles.loading}>Cargando componentes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Button onClick={() => navigate("../")}>Volver a inicio</Button>
        <div className={styles.error}>
          {error}
          <button 
            className={styles.btnRetry} 
            onClick={fetchComponentes}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button onClick={() => navigate("../")}>Volver a inicio</Button>
      <h2>Componentes y Competencias</h2>
      {componentes.length === 0 ? (
        <p>No hay componentes asociados</p>
      ) : (
        <ul className={styles.lista}>
          {componentes.map((comp) => (
            <li key={comp.id} className={styles.item}>
              <div className={styles.componenteInfo}>
                <span className={styles.nombre}>
                  Componente: {comp.descripcion}
                </span>
                <span className={styles.peso}>Peso: {comp.peso}</span>
              </div>
              <div className={styles.competencias}>
                <h4>Competencias Asociadas:</h4>
                {comp.competenciasAsociadas ? (
                  <ul>
                    {comp.competenciasAsociadas.map((competencia, index) => (
                      <li key={index}>
                        {competencia.nombre ? competencia.nombre : competencia}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay competencias asociadas</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <select onChange={handleSelectComponente} value={formData.id}>
        <option value="">-- Selecciona un componente --</option>
        {componentes.map((comp) => (
          <option key={comp.id} value={comp.id}>
            {comp.descripcion}
          </option>
        ))}
      </select>
      <input
        id="pesoComponente"
        name="peso"
        className={styles.input}
        type="number"
        value={formData.peso}
        readOnly
        placeholder=""
      />
    </div>
  );
}

export default ComponenteCompetencia;
