import React from 'react';
import InterfaceModel from './interfaceModel';
import { useNavigate } from 'react-router-dom';

// Ejemplo de datos simulados (puedes obtener estos datos de tu API)
const datosTabla = [
  { periodo: 'Enero - Abril', año: '2020', estado: 1 },
  { periodo: 'Mayo - Agosto', año: '2020', estado: 1 },
  { periodo: 'Septiembre - Diciembre', año: '2020', estado: 2 },
  { periodo: 'Enero - Abril', año: '2021', estado: 1 },
];

const Estatus = () => {
  const navigate = useNavigate();
  const handleNavigateCargaPeriodo = () => {
    navigate('/CargaPeriodos');
  };
  const handleNavigateHome = () => {
    navigate('/HomeAdmin');
  };
  return (
    <InterfaceModel
      userType="Administrador"
      titleSection="Estatus"
      titleAction="Verifica que tus archivos estén correctos"
      subtitleAction=""
      contenido={
        <>
          <table className="w-full mt-4 border-collapse text-center">
            <tbody>
              {datosTabla.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-500 border-5 py-2">{item.periodo}</td>
                  <td className="border border-gray-500 border-5 py-2">{item.año}</td>
                  <td className="border border-gray-500 border-5 py-2">
                    <span className='w-100 flex justify-center'>
                        {item.estado === 1 ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#18c07a" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#DC3545" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>
                        }
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
          <button onClick={handleNavigateHome} className="bg-orange-500 text-white font-bold px-8 py-2 rounded-xl">
              Confirmar
            </button>
          </div>
          <div className="flex items-center justify-between py-2 w-full px-5">
            <span className="text-gray-600">Mostrando 3 de 3</span>
            <div>
              <button onClick={handleNavigateCargaPeriodo} className="text-gray-600 hover:text-gray-800 mx-2">Anterior</button>
              <button className="text-gray-600 mx-2 cursor-default">Siguiente</button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Estatus;
