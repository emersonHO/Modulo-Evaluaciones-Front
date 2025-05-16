import {
  iniciaCargaCriterios,
  cargaCriterios,
  agregaNuevoCriterio,
  actualizaCriterio,
  eliminaCriterio,
} from '../slices/criterioRubricaSlice';

const baseUrl = 'http://localhost:3000/api/criterios';

export const startLoadingCriterios = (rubricaId) => {
  return async (dispatch) => {
    dispatch(iniciaCargaCriterios());

    const res = await fetch(`${baseUrl}?rubricaId=${rubricaId}`);
    const data = await res.json();

    dispatch(cargaCriterios({ criterios: data }));
  };
};

export const startAddNuevoCriterio = (criterio) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(criterio),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(agregaNuevoCriterio(data));
  };
};

export const startUpdateCriterio = (criterio) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/${criterio.id}`, {
      method: 'PUT',
      body: JSON.stringify(criterio),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(actualizaCriterio(data));
  };
};

export const startDeleteCriterio = (id) => {
  return async (dispatch) => {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });

    dispatch(eliminaCriterio(id));
  };
};