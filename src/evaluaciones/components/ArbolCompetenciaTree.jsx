import React from "react";
import Tree from "react-d3-tree";

const ArbolCompetenciaTree = ({ data }) => (
  <div style={{ width: "100%", height: "70vh" }}>
    {data && <Tree data={data} orientation="vertical" />}
  </div>
);

export default ArbolCompetenciaTree;