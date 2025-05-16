import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startLoadingNiveles,
  startAddNuevoNivel,
} from '../../../actions/nivelCriterioActions';

export default function NivelesPorCriterio({ criterioId }) {
  const dispatch = useDispatch();
  const { niveles, estaCargandoNiveles } = useSelector((state) => state.nivelCriterio);

  useEffect(() => {
    if (criterioId) {
      dispatch(startLoadingNiveles(criterioId));
    }
  }, [criterioId]);

  const handleAdd = () => {
    dispatch(
      startAddNuevoNivel({
        criterioId,
        descripcion: 'Nuevo nivel',
        puntaje: 0,
        orden: niveles.length + 1,
      })
    );
  };

  return (
    <div>
      <h6 className="mt-3">Niveles</h6>
      <button className="btn btn-sm btn-success mb-2" onClick={handleAdd}>
        Agregar Nivel
      </button>

      {estaCargandoNiveles ? (
        <p>Cargando niveles...</p>
      ) : (
        <ul className="list-group">
          {niveles.map((nivel) => (
            <li key={nivel.id} className="list-group-item d-flex justify-content-between align-items-center">
              {nivel.descripcion} <span className="badge bg-primary">{nivel.puntaje} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
