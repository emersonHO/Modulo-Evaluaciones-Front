import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCursos, setCursoIdActivo } from "../actions";
import { Autocomplete, TextField, Box, CircularProgress } from "@mui/material";

export const CursosResumen = () => {
  const dispatch = useDispatch();
  const { cursos, estaCargandoCursos } = useSelector((state) => state.curso);

  useEffect(() => {
    dispatch(getCursos());
  }, [dispatch]);

  if (estaCargandoCursos) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Autocomplete
        disablePortal
        id="comboCursos"
        sx={{ width: 600 }}
        options={
          Array.isArray(cursos)
            ? cursos.map((option) => ({
                id: option.id,
                label: option.codigo + " - " + option.nombre,
              }))
            : []
        }
        isOptionEqualToValue={(option, value) =>
          value === undefined || value === "" || option.id === value.id
        }
        renderInput={(params) => <TextField {...params} label="Curso" />}
        //onChange={handleChangeCourse}
      />
    </Box>
  );
};
