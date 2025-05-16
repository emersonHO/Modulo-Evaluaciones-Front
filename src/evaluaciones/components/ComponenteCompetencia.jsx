import React, { useEffect, useState } from "react";
import styles from "./ComponenteCompetencia.module.css";

function ComponenteCompetencia() {
  const [componentes, setComponentes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    descripcion: "",
    peso: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComponentes = async () => {
      try {
        const response = await fetch("/api/componentes-con-peso");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Datos recibidos:", data);
        setComponentes(data);
      } catch (error) {
        console.error("Error al cargar los componentes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComponentes();
  }, []);

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

  if (loading)
    return <div className={styles.loading}>Cargando componentes...</div>;
  if (error)
    return (
      <div className={styles.error}>
        Error al cargar los componentes: {error}
      </div>
    );

  return (
    <div className={styles.container}>
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
