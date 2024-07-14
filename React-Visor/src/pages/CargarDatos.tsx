import React from 'react';
import InterfaceModel from './interfaceModel';
import target1 from '../../public/target_1.png';
import target2 from '../../public/target_2.png';
import { useNavigate } from 'react-router-dom';

// Ejemplo de datos simulados (puedes obtener estos datos de tu API)
const DatosACargar = [
  { archivo: 'DPERIO.DBF'},
  { archivo: 'DGRUPO.DBF'},
  { archivo: 'DLISTA.DBF'},
  { archivo: 'DMATER.DBF'},
  { archivo: 'DCARRE.DBF'},
  { archivo: 'DALUMN.DBF'},
  { archivo: 'DPERSO.DBF'},
];

const CargarDatos = () => {
  const navigate = useNavigate();

  const handleNavigateCargarperiodos = () => {
    navigate('/CargaPeriodos');
  };

  return (
    <InterfaceModel
      userType="Administrador"
      titleSection="Cargar datos"
      titleAction="Sube los archivos DBF"
      subtitleAction=""
      contenido={
        <>
          <div className='flex flex-col md:flex-col justify-between p-5 overflow-scroll max-h-[25rem]'>
            {DatosACargar.map((dato, index) => (
            <>
                <div key={index} className="flex flex-row items-center my-2">
                <h1 className="mr-1">Archivo</h1>
                <h1 className="font-bold">{dato.archivo}</h1>
                </div>
                <div className='flex flex-row items-center justify-between bg-gray-200'>
                    <label className="bg-[#ec6b0c] w-[30%] text-center font-medium rounded-xl mx-4 my-2 cursor-pointer">
                        <span>Eaxaminar</span>
                        <input type="file" className="hidden" />
                    </label>
                    <h1 className='font-medium'>No se ha seleccionado ningún archivo</h1>
                </div>
                <div className="flex items-center justify-between py-2 w-full px-5">
          </div>
            </>
            ))}
          </div>
          
          <div className="flex items-center justify-between py-2 w-full px-5">
            <span className="text-gray-600">Mostrando 1 de 3</span>
            <div>
              <button className="text-gray-600 mx-2 cursor-default">Anterior</button>
              <button onClick={handleNavigateCargarperiodos} className="text-gray-600 hover:text-gray-800 mx-2">Siguiente</button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default CargarDatos;
