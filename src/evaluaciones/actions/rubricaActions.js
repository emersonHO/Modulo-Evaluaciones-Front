import {
  iniciaCargaRubricas,
  cargaRubricas,
  agregaNuevaRubrica,
  actualizaRubrica,
  eliminaRubrica,
} from '../slices/rubricaSlice';

const baseUrl = 'http://localhost:3000/api/rubricas';

export const startLoadingRubricas = () => {
  return async (dispatch) => {
    dispatch(iniciaCargaRubricas());

    const res = await fetch(`${baseUrl}`);
    const data = await res.json();

    dispatch(cargaRubricas({ rubricas: data }));
  };
};

export const startAddNuevaRubrica = (rubrica) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}`, {
      method: 'POST',
      body: JSON.stringify(rubrica),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(agregaNuevaRubrica(data));
  };
};

export const startUpdateRubrica = (rubrica) => {
  return async (dispatch) => {
    const res = await fetch(`${baseUrl}/${rubrica.id}`, {
      method: 'PUT',
      body: JSON.stringify(rubrica),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    dispatch(actualizaRubrica(data));
  };
};

export const startDeleteRubrica = (id) => {
  return async (dispatch) => {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });

    dispatch(eliminaRubrica(id));
  };
};