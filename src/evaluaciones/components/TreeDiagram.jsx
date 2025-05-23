import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { fetchEvaluationTree } from '../services/treeService';
import './TreeDiagram.module.css';

function transformTreeData(data) {
  return data.map(competence => ({
    name: competence.nombre,
    attributes: { id: competence.id },
    children: (competence.componentes || []).map(component => ({
      name: `Component ${component.id} (Weight: ${component.peso})`,
      attributes: { id: component.id },
      children: (component.formulas || []).map(formula => ({
        name: formula.codigo || `Formula ${formula.id}`,
        attributes: { id: formula.id, description: formula.descripcion }
      }))
    }))
  }));
}

export default function TreeDiagram() {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvaluationTree()
      .then(data => setTreeData(transformTreeData(data)))
      .catch(() => setTreeData([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading tree...</div>;
  if (!treeData.length) return <div>No data available</div>;

  return (
    <div className="tree-container">
      <Tree data={treeData} orientation="vertical"/>
    </div>
  );
}