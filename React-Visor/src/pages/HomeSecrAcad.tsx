import { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import img from '../../public/image2.png';
import { getFromLocalStorage } from '../context/Credentials';
import instance from '../api/axios';

const HomeSecretAcad = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [carreraSeleccionado, setCarreraSeleccionado] = useState<string | null>(
    null
  );
  const [Periodos, setPeriodos] = useState<string[]>([]);
  const [PkPeriodo, setPkPeriodos] = useState<number[]>([]);
  const [Carreras, setCarreras] = useState<string[]>([]);
  const [PkCarrera, setPkCarreras] = useState<number[]>([]);

  async function getPeriodos() {
    try {
      const responsePeriodos = await instance.get('/periodo');
      const periodos = responsePeriodos.data.map((item: any) => item.Periodo);
      const pkPeriodos = responsePeriodos.data.map((item: any) => item.pk);
      setPeriodos(periodos);
      setPkPeriodos(pkPeriodos);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCarreras() {
    try {
      const responseCarreras = await instance.get('/carrera/read');
      const carreras = responseCarreras.data.map((item: any) => item.nombre);
      const pkCarrera = responseCarreras.data.map((item: any) => item.pk);
      setPkCarreras(pkCarrera);
      setCarreras(carreras);
    } catch (error) {
      console.error(error);
    }
  }

  async function postPeriodo(fkCarrera: number, fkPeriodo: number) {
    try {
      const response = await instance.post(
        '/reports/all',
        {
          fkCarrera: fkCarrera,
          fkPeriodo: fkPeriodo
        },
        {
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'DesempeñoEscolar.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const localData = getFromLocalStorage();
    getPeriodos();
    getCarreras();
    if (localData) {
      setUserType(
        localData.rol === 'secretario' ? 'Secretario Académico' : localData.rol
      );
    }
  }, []);

  return (
    <InterfaceModel
      userType={userType || 'Usuario'}
      titleSection="Desempeño escolar"
      titleAction="Estás a punto de descargar los indicadores de la universidad."
      subtitleAction="¡Esperamos que esta información sea de gran utilidad para ti!"
      contenido={
        <>
          <select
            value={carreraSeleccionado || ''}
            onChange={(e) => setCarreraSeleccionado(e.target.value)}
            className="w-full p-2 border border-gray-500 rounded">
            <option value="">Seleccione una carrera</option>
            {Carreras.map((carrera, index) => (
              <option key={index} value={PkCarrera[index]}>
                {carrera}
              </option>
            ))}
          </select>
          <div className="flex flex-col md:flex-row">
            <div>
              <img src={img} className="w-full md:w-[800px] h-auto" />
            </div>
            <div className="flex flex-col w-full justify-center items-center p-5">
              {Periodos.map((periodo, index) => (
                <button
                  key={index}
                  onClick={() =>
                    postPeriodo(Number(carreraSeleccionado), PkPeriodo[index])
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 m-1 md:m-6 rounded-full w-[60%]">
                  Descargar desempeño {periodo}
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
