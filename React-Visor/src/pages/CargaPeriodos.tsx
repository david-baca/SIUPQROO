import React, { useState, useEffect, ChangeEvent } from 'react';
import InterfaceModel from './interfaceModel';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

// Definición de la interfaz para la respuesta de la API
interface ApiResponse {
  estado: string;
  periodo: string;
  ano: string;
  fecha: null | string,
  codigoPeriodo: null | string,
  fechaFinPeriodo: string,
}

// Constantes
const cuatrimestres = [
  { cuatrimestre: 'Enero - Abril', mes: 4 },
  { cuatrimestre: 'Mayo - Agosto', mes: 8 },
  { cuatrimestre: 'Septiembre - Diciembre', mes: 12 },
];

const anioActual = new Date().getFullYear();
const mesActual = new Date().getMonth() + 1; // Enero es 0

const VistaCargaPeriodos = () => {
  const [response, setResponse] = useState<ApiResponse[] | null>(null);

  return response ? <Estatus response={response} /> : <CargaPeriodos setResponse={setResponse} />;
};

// Componente CargaPeriodos
interface CargaPeriodosProps {
  setResponse: React.Dispatch<React.SetStateAction<ApiResponse[] | null>>;
}

const CargaPeriodos: React.FC<CargaPeriodosProps> = ({ setResponse }) => {
  const navigate = useNavigate();

  const [cuatrimestreSeleccionado, setCuatrimestreSeleccionado] = useState([
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
  ]);

  const validar = () => {
    const newCuatrimestreSeleccionado = cuatrimestreSeleccionado.map(selection => {
      if (selection.cuatri === "Cuatrimestre" || selection.anio === 0) return selection;
      if (selection.anio !== anioActual) return selection;
      if (mesActual <= selection.mes) return { ...selection, cuatri: "Cuatrimestre", mes: 0 };
      return selection;
    });
    setCuatrimestreSeleccionado(newCuatrimestreSeleccionado);
  };

  const handleAnioChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newSelections = [...cuatrimestreSeleccionado];
    newSelections[index].anio = parseInt(e.target.value, 10) || 0;
    setCuatrimestreSeleccionado(newSelections);
    validar();
  };

  const handleAnioBlur = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    let anio = parseInt(e.target.value, 10) || 0;
    if (anio < 2019 || anio > anioActual) anio = 0;
    const newSelections = [...cuatrimestreSeleccionado];
    newSelections[index].anio = anio;
    setCuatrimestreSeleccionado(newSelections);
    validar();
  };

  const handleCuatrimestreChange = (index: number, e: ChangeEvent<HTMLSelectElement>) => {
    const cuatrimestre = cuatrimestres.find(c => c.cuatrimestre === e.target.value);
    const newSelections = [...cuatrimestreSeleccionado];
    newSelections[index].cuatri = cuatrimestre ? cuatrimestre.cuatrimestre : "Cuatrimestre";
    newSelections[index].mes = cuatrimestre ? cuatrimestre.mes : 0;
    setCuatrimestreSeleccionado(newSelections);
    validar();
  };

  const esValido = () => {
    return cuatrimestreSeleccionado.some(selection => selection.cuatri !== "Cuatrimestre" && selection.anio !== 0);
  };

  const obtenerFechasValidas = async () => {
    const validos = cuatrimestreSeleccionado.filter(selection => selection.cuatri !== "Cuatrimestre" && selection.anio !== 0);
    const fechas = validos.map((selection, index) => {
      const mesFin = selection.mes;
      return {
        [`fecha${index + 1}`]: `01-${mesFin}-${selection.anio}`
      };
    });
    return Object.assign({}, ...fechas);
  };

  const handleNavigateEstatus = async () => {
    try {
      const fechasValidas = await obtenerFechasValidas();
      const response = await axios.post('/dbf/extract', fechasValidas);
      setResponse(response.data.request);
    } catch (error) {
      alert("No se logró cargar los datos");
    }
  };

  const handleNavigateCargaDatos = () => {
    navigate('/CargarDatos');
  };

  return (
    <InterfaceModel
      userType="Administrador"
      titleSection="Carga de periodos"
      titleAction="Selecciona los periodos cuatrimestrales (máximo 4)"
      subtitleAction=""
      contenido={
        <>
          <table className="w-full mt-4 text-center">
            <tbody>
              {cuatrimestreSeleccionado.map((selection, index) => (
                <tr key={index} className="">
                  <td className="p-2">
                    <select
                      value={selection.cuatri}
                      onChange={(e) => handleCuatrimestreChange(index, e)}
                      className="w-full p-2 border border-gray-500 rounded"
                    >
                      <option value="Cuatrimestre">Cuatrimestre</option>
                      {cuatrimestres.map((cuatri, i) => (
                        <option key={i} value={cuatri.cuatrimestre}>
                          {cuatri.cuatrimestre}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="2019"
                      max={anioActual}
                      value={selection.anio === 0 ? "" : selection.anio}
                      onChange={(e) => handleAnioChange(index, e)}
                      onBlur={(e) => handleAnioBlur(index, e)}
                      className="w-full p-2 border border-gray-500 rounded"
                      placeholder="Año"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button
              className="bg-orange-500 text-white font-bold px-8 py-2 rounded-xl"
              disabled={!esValido()}
              onClick={handleNavigateEstatus}
            >
              Cargar Archivos
            </button>
          </div>
          <div className="flex items-center justify-between py-2 w-full px-5">
            <span className="text-gray-600">Mostrando 2 de 3</span>
            <div>
              <button onClick={handleNavigateCargaDatos} className="text-gray-600 hover:text-gray-800 mx-2">Anterior</button>
              <button onClick={handleNavigateEstatus} className="text-gray-600 hover:text-gray-800 mx-2" disabled={!esValido()}>Siguiente</button>
            </div>
          </div>
        </>
      }
    />
  );
};

// Componente Estatus
interface EstatusProps {
  response: ApiResponse[];
}

const Estatus: React.FC<EstatusProps> = ({ response }) => {
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
              {response.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="border border-gray-500 border-5 py-2">{item.periodo}</td>
                  <td className="border border-gray-500 border-5 py-2">{item.ano}</td>
                  <td className="border border-gray-500 border-5 py-2">
                    <span className='w-100 flex justify-center'>
                      {item.estado === "activo" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#18c07a" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#DC3545" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                        </svg>
                      )}
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

export default VistaCargaPeriodos;
