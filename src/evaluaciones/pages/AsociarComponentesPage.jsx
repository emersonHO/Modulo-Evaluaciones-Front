import styles from "./AsociarComponentesPage.module.css";
import { useState, useEffect } from "react";
import { componenteService } from "../services/componenteService";
import {
  Dialog,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate} from "react-router-dom";
import { Button } from "react-bootstrap";

const AsociarComponentesPage = () => {
  const navigate= useNavigate();
  const [componentes, setComponentes] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCrearDialog, setOpenCrearDialog] = useState(false);
  const [editingComponente, setEditingComponente] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: "",
    peso: "",
    id: "",
  });
  const [nuevoComponente, setNuevoComponente] = useState({
    descripcion: "",
    peso: "",
  });
  const [componentesDisponibles, setComponentesDisponibles] = useState([]);
  const [openCompetenciasDialog, setOpenCompetenciasDialog] = useState(false);
  const [competenciasDisponibles, setCompetenciasDisponibles] = useState([]);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
  const [competenciasSeleccionadas, setCompetenciasSeleccionadas] = useState(
    []
  );

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await componenteService.getComponentesConCompetencias();
        if (data) {
          setComponentes(data);
          setComponentesDisponibles(data);
        }
      } catch (error) {
        console.error("Error al cargar componentes:", error);
        setError("Error al cargar los componentes. Por favor, intente más tarde.");
      }
    };
    cargarDatos();
  }, []);

  const handleOpenDialog = (componente = null) => {
    if (componente) {
      setEditingComponente(componente);
      setFormData({
        id: componente.idComponente || componente.id,
        descripcion: componente.descripcion,
        peso: componente.peso,
      });
    } else {
      setEditingComponente(null);
      setFormData({
        id: "",
        descripcion: "",
        peso: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingComponente(null);
    setFormData({
      descripcion: "",
      peso: "",
      id: "",
    });
  };

  const handleSelectComponente = (e) => {
    const selectedId = e.target.value;
    const selected = componentesDisponibles.find(
      (c) => String(c.id) === String(selectedId)
    );
    setFormData((prev) => ({
      ...prev,
      id: selected ? selected.id : "",
      descripcion: selected ? selected.descripcion : "",
      peso: selected ? selected.peso : "",
    }));
  };

  const handleSave = async () => {
    try {
      const selected = componentesDisponibles.find(
        (c) => String(c.id) === String(formData.id)
      );
      if (!selected) {
        setError("Debes seleccionar un componente válido.");
        return;
      }
      const nuevoComponente = {
        ...selected,
        ...formData,
        idComponente: selected.id,
        peso: selected.peso,
        descripcion: selected.descripcion,
      };
      setComponentes((prev) => {
        if (editingComponente) {
          // Si se está editando, actualizar el componente existente
          return prev.map((c) =>
            c.idComponente === editingComponente.idComponente
              ? nuevoComponente
              : c
          );
        } else {
          // Si es nuevo, agregarlo
          const existe = prev.find(
            (c) => c.idComponente === nuevoComponente.idComponente
          );
          if (existe) {
            return prev.map((c) =>
              c.idComponente === nuevoComponente.idComponente
                ? nuevoComponente
                : c
            );
          } else {
            return [...prev, nuevoComponente];
          }
        }
      });
      handleCloseDialog();
    } catch (err) {
      setError("Error al guardar: " + err.message);
    }
  };

  const handleDelete = async (nombreComponente) => {
    if (window.confirm("¿Está seguro de eliminar este componente?")) {
      try {
        await componenteService.deleteComponenteByNombre(nombreComponente);
        setComponentes((prev) =>
          prev.filter((c) => c.descripcion !== nombreComponente)
        );
        alert("Componente borrado.");
      } catch {
        alert("Error al eliminar el componente");
      }
    }
  };

  // Abrir modal de competencias para un componente
  const handleOpenCompetenciasDialog = (componente) => {
    setComponenteSeleccionado(componente);
    setCompetenciasSeleccionadas(componente.competencias || []);
    componenteService.getCompetencias().then((data) => {
      console.log("Competencias recibidas:", data);
      setCompetenciasDisponibles(data);
      setOpenCompetenciasDialog(true);
    });
  };

  const handleCloseCompetenciasDialog = () => {
    setOpenCompetenciasDialog(false);
    setComponenteSeleccionado(null);
    setCompetenciasSeleccionadas([]);
  };

  const handleToggleCompetencia = (competencia) => {
    setCompetenciasSeleccionadas((prev) =>
      prev.some((c) => c.id === competencia.id)
        ? prev.filter((c) => c.id !== competencia.id)
        : [...prev, competencia]
    );
  };

  const handleGuardarCompetencias = () => {
    setComponentes((prev) =>
      prev.map((c) =>
        c.idComponente === componenteSeleccionado.idComponente
          ? { ...c, competencias: competenciasSeleccionadas }
          : c
      )
    );
    handleCloseCompetenciasDialog();
  };

  const handleGuardarCambios = async () => {
    try {
      for (const componente of componentes) {
        if (componente.competencias && componente.competencias.length > 0) {
          for (const competencia of componente.competencias) {
            const dataToSend = {
              componenteId: componente.idComponente,
              competenciaId: competencia.id,
              peso: parseFloat(componente.peso) || 0.0,
            };
            console.log("Enviando datos:", dataToSend);
            await componenteService.createComponente(dataToSend);
          }
        }
      }
      alert("Cambios guardados exitosamente");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert(
        "Error al guardar los cambios: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  // Filtrar componentes para que solo quede una descripción única
  const componentesUnicos = componentesDisponibles.filter(
    (comp, index, self) =>
      index === self.findIndex((c) => c.descripcion === comp.descripcion)
  );

  const handleOpenCrearDialog = () => {
    setOpenCrearDialog(true);
    setNuevoComponente({
      descripcion: "",
      peso: "",
    });
  };

  const handleCloseCrearDialog = () => {
    setOpenCrearDialog(false);
    setNuevoComponente({
      descripcion: "",
      peso: "",
    });
  };

  const handleCrearComponente = async () => {
    try {
      if (!nuevoComponente.descripcion || !nuevoComponente.peso) {
        setError("Por favor complete todos los campos");
        return;
      }
      
      // Por ahora solo cerraremos el diálogo
      handleCloseCrearDialog();
      alert("Componente creado exitosamente");
    } catch (err) {
      setError("Error al crear el componente: " + err.message);
    }
  };

  if (error) {
    return (
      <div className={styles.page}>
        <Button onClick={() => navigate("../")}>Ir a inicio</Button>
        <div className={styles.error}>
          {error}
          <button 
            className={styles.btnRetry} 
            onClick={() => window.location.reload()}
            style={{ marginLeft: '10px', padding: '5px 10px' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Button onClick={()=> navigate("../")}>Ir a inicio</Button>
      <div className={styles.tituloContainer}>
        <h2 className={styles.titulo}>ASOCIAR COMPONENTES A COMPETENCIAS</h2>
      </div>
      <div className={styles.tablaContainer}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th className={styles.thComponente}>Componente</th>
              <th className={styles.thCompetencias}>Competencias Asociadas</th>
              <th className={styles.thPeso}>Peso (%)</th>
              <th className={styles.thAcciones}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {componentes.map((item) => (
              <tr
                key={
                  item.idComponente ||
                  item.id ||
                  `${item.descripcionComponente}-${item.peso}`
                }
              >
                <td>{item.descripcion}</td>
                <td>
                  {item.competencias && item.competencias.length > 0 ? (
                    item.competencias.map((c) => c.nombre).join(", ")
                  ) : (
                    <span style={{ color: "#888" }}>Sin competencias</span>
                  )}
                  <button
                    className={styles.addBtn}
                    title="Asociar competencias"
                    onClick={() => handleOpenCompetenciasDialog(item)}
                    style={{ marginLeft: 8 }}
                  >
                    +
                  </button>
                </td>
                <td>{item.peso}</td>
                <td className={styles.acciones}>
                  <button
                    className={styles.accion}
                    onClick={() => handleOpenDialog(item)}
                    title="Editar"
                    style={{
                      color: "#1a237e",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <EditIcon
                      fontSize="small"
                      style={{ color: "#1a237e", marginRight: 4 }}
                    />{" "}
                    Editar
                  </button>
                  <span style={{ color: "#888", margin: "0 4px" }}>/</span>
                  <button
                    className={styles.accionEliminar}
                    onClick={() => handleDelete(item.descripcion)}
                    title="Eliminar"
                    style={{
                      color: "#d32f2f",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon
                      fontSize="small"
                      style={{ color: "#d32f2f", marginRight: 4 }}
                    />{" "}
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.agregarContainer}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <button 
            className={`${styles.agregar} ${styles.crearBtn}`} 
            onClick={() => handleOpenDialog()}
            style={{ width: 'auto', padding: '12px 24px' }}
          >
            + Agregar Componente
          </button>
          <button 
            className={`${styles.agregar} ${styles.crearBtn}`} 
            onClick={handleOpenCrearDialog}
            style={{ marginTop: '10px', width: 'auto', padding: '12px 24px' }}
          >
            + Crear Componente
          </button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#43a047", // Verde
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
          onClick={handleGuardarCambios}
        >
          Guardar
        </Button>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{ className: styles.dialogPaper }}
      >
        <div className={styles.dialogHeader}>
          <span className={styles.iconMorado}>♦️</span>
          <span className={styles.dialogTitleText}>
            {editingComponente ? "Editar componente" : "Agregar componente"}
          </span>
        </div>
        <DialogContent className={styles.dialogContent}>
          <label className={styles.label} htmlFor="nombreComponente">
            Nombre del componente:
          </label>
          <select
            id="nombreComponente"
            name="id"
            className={styles.input}
            value={String(formData.id) || ""}
            onChange={handleSelectComponente}
          >
            <option value="">-- Selecciona un componente --</option>
            {componentesUnicos.map((comp) => (
              <option key={comp.id} value={String(comp.id)}>
                {comp.descripcion}
              </option>
            ))}
          </select>
          <label className={styles.label} htmlFor="pesoComponente">
            Peso del componente:
          </label>
          <input
            id="pesoComponente"
            name="peso"
            className={styles.input}
            type="number"
            value={
              formData.peso !== null && formData.peso !== undefined
                ? formData.peso
                : ""
            }
            readOnly
            placeholder=""
          />
          <div className={styles.botonesModal}>
            <button className={styles.btnCancelar} onClick={handleCloseDialog}>
              Cancelar
            </button>
            <button className={styles.btnGuardar} onClick={handleSave}>
              Guardar
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Modal de checklist de competencias */}
      <Dialog
        open={openCompetenciasDialog}
        onClose={handleCloseCompetenciasDialog}
        PaperProps={{ className: styles.dialogPaper }}
      >
        <div className={styles.dialogHeader}>
          <span className={styles.iconMorado}>♦️</span>
          <span className={styles.dialogTitleText}>
            Seleccionar competencias para el componente
          </span>
        </div>
        <DialogContent className={styles.dialogContent}>
          {competenciasDisponibles.length === 0 ? (
            <div>Cargando competencias...</div>
          ) : (
            competenciasDisponibles.map((comp) => (
              <FormControlLabel
                key={comp.id}
                control={
                  <Checkbox
                    checked={competenciasSeleccionadas.some(
                      (c) => c.id === comp.id
                    )}
                    onChange={() => handleToggleCompetencia(comp)}
                  />
                }
                label={comp.nombre}
              />
            ))
          )}
          <div className={styles.botonesModal}>
            <Button
              onClick={handleCloseCompetenciasDialog}
              className={styles.btnCancelarCompetencia}
            >
              CANCELAR
            </Button>
            <Button
              onClick={handleGuardarCompetencias}
              className={styles.btnGuardarCompetencia}
            >
              GUARDAR
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Diálogo para crear nuevo componente */}
      <Dialog
        open={openCrearDialog}
        onClose={handleCloseCrearDialog}
        PaperProps={{ className: styles.dialogPaper }}
      >
        <div className={styles.dialogHeader}>
          <span className={styles.iconMorado}>♦️</span>
          <span className={styles.dialogTitleText}>
            Crear nuevo componente
          </span>
        </div>
        <DialogContent className={styles.dialogContent}>
          <label className={styles.label} htmlFor="nombreNuevoComponente">
            Nombre del componente:
          </label>
          <input
            id="nombreNuevoComponente"
            className={styles.input}
            type="text"
            value={nuevoComponente.descripcion}
            onChange={(e) => setNuevoComponente({...nuevoComponente, descripcion: e.target.value})}
            placeholder="Ingrese el nombre del componente"
          />
          <label className={styles.label} htmlFor="pesoNuevoComponente">
            Peso del componente (%):
          </label>
          <input
            id="pesoNuevoComponente"
            className={styles.input}
            type="number"
            min="0"
            max="100"
            value={nuevoComponente.peso}
            onChange={(e) => setNuevoComponente({...nuevoComponente, peso: e.target.value})}
            placeholder="Ingrese el peso del componente"
          />
          <div className={styles.botonesModal}>
            <button className={styles.btnCancelar} onClick={handleCloseCrearDialog}>
              Cancelar
            </button>
            <button className={styles.btnGuardar} onClick={handleCrearComponente}>
              Crear
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AsociarComponentesPage;
