import { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import img from '../../public/image2.png';
import { getFromLocalStorage } from '../context/Credentials'; 

const HomeSecretAcad = () => {
  const [userType, setUserType] = useState<string | null>(null); 
  const [carreraSeleccionado, setCarreraSeleccionado] = useState<string | null>(null);

  const carreras = [
    { nombre: "Ingeniería en software", pk: 1 },
    { nombre: "Ingeniería administrativa", pk: 2 },
    { nombre: "Generación de topologías", pk: 3 }
  ];

  const periodos = [
    { nombre: "Enero - Abril 2020", pk: 1 },
    { nombre: "Enero - Abril 2022", pk: 2 },
    { nombre: "Enero - Abril 2023", pk: 3 }
  ];

  useEffect(() => {
    const localData = getFromLocalStorage(); 
    if (localData) {
      setUserType(localData.rol === "secretario" ? "Secretario Académico" : localData.rol); 
    }
  }, []);

  return (
    <InterfaceModel
      userType={userType || "Usuario"} 
      titleSection="Desempeño escolar"
      titleAction="Estás a punto de descargar los indicadores de la universidad."
      subtitleAction="¡Esperamos que esta información sea de gran utilidad para ti!"
      contenido={
        <>
          <select
            value={carreraSeleccionado || ""}
            onChange={(e) => setCarreraSeleccionado(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded"
          >
            <option value="">Seleccione una carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.pk} value={carrera.pk}>
                {carrera.nombre}
              </option>
            ))}
          </select>
          <div className="flex flex-col md:flex-row">
            <div>
              <img 
                src={img}
                className="w-full md:w-[800px] h-auto" 
              />
            </div>
            <div className="flex flex-col w-full justify-center items-center p-5">
              {periodos.map((item) => (
                <button key={item.pk} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 m-1 md:m-6 rounded-full w-[60%]">
                  Descargar desempeño {item.nombre}
                </button>
              ))}
            </div>
          </div>
        </>
      }
    />
  );
};

export default HomeSecretAcad;
