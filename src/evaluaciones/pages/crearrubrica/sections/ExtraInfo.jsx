import { useState } from "react";
import { Button, Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AutocompleteSelect({ label, options, value, onChange }) {
  return (
    <Autocomplete
      className="dropdown-select"
      options={options}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
    />
  );
}

const temporal = [
  { name: "comp1", id: 1 },
  { name: "comp2", id: 2 },
  { name: "comp3", id: 3 }
];

export default function ExtraInfo() {
  const navigate = useNavigate();
  const [selectedComp, setSelectedComp] = useState(null);
  const [selectedCur, setSelectedCur] = useState(null);

  return (
    <section>
        <div className="comp-cur-crear-rubrica">
          <AutocompleteSelect
            label="Componente asociado"
            options={temporal}
            value={selectedComp}
            onChange={setSelectedComp}
          />
          <AutocompleteSelect
            label="Curso asociado"
            options={temporal}
            value={selectedCur}
            onChange={setSelectedCur}
          />
          <Button>Crear Rubrica</Button>
        </div>
    </section>
  );
}
