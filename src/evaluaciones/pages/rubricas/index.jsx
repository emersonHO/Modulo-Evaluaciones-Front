import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRubricas } from '../../actions/rubricaActions';

export default function Rubricas() {
  const dispatch = useDispatch();
  const { rubricas, estaCargandoRubricas } = useSelector((state) => state.rubrica);

  useEffect(() => {
    dispatch(startLoadingRubricas());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Lista de Rúbricas</h2>

      {estaCargandoRubricas ? (
        <p>Cargando...</p>
      ) : (
        <ul className="list-group">
          {rubricas.map((r) => (
            <li className="list-group-item" key={r.id}>
              {r.nombre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
