import { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import img from '../../public/image1.png';
import { getFromLocalStorage } from '../context/Credentials';
import instance from '../api/axios';

const HomeDirectCar = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [Periodos, setPeriodos] = useState<string[]>([]);
  const [PkPeriodo, setPkPeriodos] = useState<number[]>([]);
  const [FkCarrera, setFkCarrera] = useState<number | null>(null);

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

  async function postPeriodo(fkCarrera: number, fkPeriodo: number, periodo: String) {
    try {
      const carrerax = await instance.get("/carrera/read/"+fkCarrera)
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
      let nombre = "DESEMPEÑO ESCOLAR "+carrerax.data.nombre+" "+periodo+".xlsx"
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombre);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPeriodos();
    const localData: any = getFromLocalStorage();
    setFkCarrera(localData.fk_Carrera || null);
    if (localData) {
      setUserType(
        localData.rol === 'director' ? 'Director de Carrera' : localData.rol
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
          <div className="flex flex-col md:flex-row">
            <div>
              <img src={img} className="w-full md:w-[800px] h-auto" />
            </div>
            <div className="flex flex-col w-full justify-center items-center p-5">
            {Periodos && Periodos.length > 0 ? (
            Periodos.map((item, index) => (
                <button
                  key={index}
                  onClick={() => postPeriodo(FkCarrera!, PkPeriodo[index], item)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 m-1 md:m-6 rounded-full w-[60%]">
                  Descargar desempeño {item}
                </button>
              ))
            ) : (<>
              <h1>Acutualmente no hay datos cargados en el sistema.</h1>
              <h1>Puede solicitar la carga con el administrador.</h1>
            </>)}
            </div>
          </div>
        </>
      }
    />
  );
};

export default HomeDirectCar;
