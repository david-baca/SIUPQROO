import React from 'react';
import InterfaceModel from './interfaceModel';
import target1 from '../../public/target_1.png';
import target2 from '../../public/target_2.png';
import { useNavigate } from 'react-router-dom';


const HomeAdmin = () => {
  const navigate = useNavigate();

  const handleNavigateCargar = () => {
    navigate('/CargarDatos');
  };

  const handleNavigateEliminar = () => {
    navigate('/DeleteData');
  };
  return (
    <InterfaceModel
      userType="Administrador"
      titleSection="¿Qué desea hacer hoy?"
      titleAction=""
      subtitleAction=""
      contenido={
        <>
        <div className='flex flex-col md:flex-row justify-between p-5'>

          <button onClick={handleNavigateCargar} className="text-center md:max-w-[40%] rounded-xl border-[5px] border-gray-300 m-5">
            <h1 className="text-xl font-bold p-5">Cargar datos</h1>
            <img src={target1} className="w-auto h-[30rem]" alt="Imagen de carga de datos" />
          </button>

          <button onClick={handleNavigateEliminar} className="text-center md:max-w-[40%] rounded-xl border-[5px] border-gray-300 m-5">
            <h1 className="text-xl font-bold p-5">Eliminar datos</h1>
            <img src={target2} className="w-auto h-[30rem]" alt="Imagen de eliminación de datos" />
          </button>

        </div>
        </>
      }
    />
  );
};

export default HomeAdmin;