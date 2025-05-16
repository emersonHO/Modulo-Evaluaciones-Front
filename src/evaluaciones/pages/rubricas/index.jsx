import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRubricas } from '../../actions/rubricaActions';
import { RubricaItem } from './components/RubricaItem';

export default function Rubricas() {
  const dispatch = useDispatch();
  const { rubricas } = useSelector((state) => state.rubrica);

  useEffect(() => {
    dispatch(startLoadingRubricas());
  }, [dispatch]);


  const handleVer = (rubrica) => {
    console.log('Ver rúbrica:', rubrica);
    
  };

  const handleEditar = (rubrica) => {
    console.log('Editar rúbrica:', rubrica);
    
  };

  const handleEliminar = (rubricaId) => {
    console.log('Eliminar rúbrica con ID:', rubricaId);
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Rúbricas</h2>

      {rubricas.map((rubrica) => (
        <RubricaItem
          key={rubrica.id}
          rubrica={rubrica}
          onVer={handleVer}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      ))}
    </div>
  );
}
