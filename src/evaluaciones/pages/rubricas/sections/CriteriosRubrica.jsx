import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startLoadingCriterios,
  startAddNuevoCriterio,
} from '../../../actions/criterioRubricaActions';

import NivelesPorCriterio from './NivelesPorCriterio';

export default function CriteriosRubrica({ rubricaId }) {
  const dispatch = useDispatch();
  const { criterios } = useSelector((state) => state.criterioRubrica);
  const [criteriosAbiertos, setCriteriosAbiertos] = useState([]);

  useEffect(() => {
    if (rubricaId) {
      dispatch(startLoadingCriterios(rubricaId));
    }
  }, [rubricaId]);

  const toggleCriterio = (id) => {
    setCriteriosAbiertos((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleAgregarCriterio = () => {
    dispatch(
      startAddNuevoCriterio({
        rubricaId,
        descripcion: 'Nuevo criterio',
        peso: 0,
      })
    );
  };

  return (
    <div className="mt-4">
      <h5>Criterios de la Rúbrica</h5>
      <button className="btn btn-sm btn-success mb-3" onClick={handleAgregarCriterio}>
        + Agregar Criterio
      </button>

      {criterios.length === 0 ? (
        <p>No hay criterios registrados aún.</p>
      ) : (
        <div className="accordion" id="criteriosAccordion">
          {criterios.map((criterio) => (
            <div key={criterio.id} className="accordion-item mb-2">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => toggleCriterio(criterio.id)}
                >
                  {criterio.descripcion} <span className="ms-auto badge bg-secondary">{criterio.peso}%</span>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  criteriosAbiertos.includes(criterio.id) ? 'show' : ''
                }`}
              >
                <div className="accordion-body">
                  <NivelesPorCriterio criterioId={criterio.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}