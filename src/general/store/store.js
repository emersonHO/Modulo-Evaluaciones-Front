import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../seguridad/slices';
import { cursoSlice } from '../../cursos/slices';
import { rubricaSlice, criterioRubricaSlice, nivelCriterioSlice, formulaSlice} from '../../evaluaciones/slices';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    curso: cursoSlice.reducer,
    formula: formulaSlice.reducer,
    rubrica: rubricaSlice.reducer,
    criterioRubrica: criterioRubricaSlice.reducer,
    nivelCriterio: nivelCriterioSlice.reducer,
  },
});
