import { useState } from "react";
import { Button, Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AutocompleteSelect({ label, options, value, onChange }) {
  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
    />
  );
}

export default function MainInfo() {
  const navigate = useNavigate();
  const [rubricaTitle, setRubricaTitle]= useState("");
  const [rubricaDesc, setRubricaDesc]= useState("");

  return (
    <section>
      <div>
        <h3>Crear una rúbrica</h3>
        <p>Añadir a un componente designado de un curso en específico</p>

        <TextField
            label="Nombre de la rúbrica"
            variant="outlined"
            value={rubricaTitle}
            onChange={(e)=> setRubricaTitle(e.target.value)}
        />
        <TextField
            label="Descripción de la rúbrica"
            variant="outlined"
            value={rubricaDesc}
            onChange={(e)=> setRubricaDesc(e.target.value)}
        />
      </div>
    </section>
  );
}
