import {
  iniciaCargaNiveles,
  cargaNiveles,
  agregaNuevoNivel,
  actualizaNivel,
  eliminaNivel,
} from '../slices/nivelCriterioSlice';

const baseUrl = 'http://localhost:3000/api/niveles';

export const startLoadingNiveles = (criterioId) => {
  return async (dispatch) => {
    dispatch(iniciaCargaNiveles());

    const res = await fetch(`${baseUrl}?criterioId=${criterioId}`);
    const data = await res.json();

    dispatch(cargaNiveles({ niveles: data }));
  };
};

export const startAddNuevoNivel = (nivel) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(nivel),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(agregaNuevoNivel(data));
  };
};

export const startUpdateNivel = (nivel) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/${nivel.id}`, {
      method: 'PUT',
      body: JSON.stringify(nivel),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(actualizaNivel(data));
  };
};

export const startDeleteNivel = (id) => {
  return async (dispatch) => {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });

    dispatch(eliminaNivel(id));
  };
};