import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import axios from "axios";

const transformData = (data) =>
  data.map((competencia) => ({
    name: competencia.nombre,
    children: competencia.componentes.map((componente) => ({
      name: componente.nombre,
      children: componente.formulas.map((formula) => ({
        name: formula.descripcion,
      })),
    })),
  }));

export default function TreeDiagramPage() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/tree") // Update with your actual endpoint if different
      .then((res) => setTreeData(transformData(res.data)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "100vw", height: "80vh" }}>
      <h2>Relación entre Competencias, Componentes y Fórmulas</h2>
      {treeData.length > 0 ? (
        <Tree data={treeData} orientation="vertical" />
      ) : (
        <p>Cargando árbol...</p>
      )}
    </div>
  );
}



