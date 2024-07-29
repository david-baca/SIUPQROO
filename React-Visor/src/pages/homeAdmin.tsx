import { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import target1 from '../../public/target_1.png';
import target2 from '../../public/target_2.png';
import target0 from '../../public/target_0.png'
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../context/Credentials';

const HomeAdmin = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const localData = getFromLocalStorage();
    if (localData) {
      setUserType(localData.rol === "administrador" ? "Administrador" : localData.rol);
    }
  }, []);

  const handleNavigateAdministrarPermisos = () => {
    navigate('/Permisos');
  };

  const handleNavigateCargar = () => {
    navigate('/CargarDatos');
  };

  const handleNavigateEliminar = () => {
    navigate('/DeleteData');
  };

  return (
    <InterfaceModel
      userType={userType || "Usuario"}
      titleSection="¿Qué desea hacer hoy?"
      titleAction=""
      subtitleAction=""
      contenido={
        <>
          <div className='flex flex-col md:flex-row justify-between p-5'>
            <button onClick={handleNavigateAdministrarPermisos} className="text-center md:max-w-[40%] rounded-xl border-[5px] border-gray-300 m-5">
              <h1 className="text-xl font-bold p-5">Administrar permisos</h1>
              <img src={target0} className="w-auto h-[25rem]" alt="Imagen de permisos" />
            </button>
            <button onClick={handleNavigateCargar} className="text-center md:max-w-[40%] rounded-xl border-[5px] border-gray-300 m-5">
              <h1 className="text-xl font-bold p-5">Cargar datos</h1>
              <img src={target1} className="w-auto h-[25rem]" alt="Imagen de carga de datos" />
            </button>

            <button onClick={handleNavigateEliminar} className="text-center md:max-w-[40%] rounded-xl border-[5px] border-gray-300 m-5">
              <h1 className="text-xl font-bold p-5">Eliminar datos</h1>
              <img src={target2} className="w-auto h-[25rem]" alt="Imagen de eliminación de datos" />
            </button>
          </div>
        </>
      }
    />
  );
};

export default HomeAdmin;
