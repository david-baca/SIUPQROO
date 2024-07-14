import React, { useState, useEffect, ChangeEvent } from 'react';
import InterfaceModel from './interfaceModel';
import { useNavigate } from 'react-router-dom';

// Ejemplo de datos simulados (puedes obtener estos datos de tu API)
const cuatrimestres = [
  { cuatrimestre: 'Enero - Abril', mes: 4 },
  { cuatrimestre: 'Mayo - Agosto', mes: 8 },
  { cuatrimestre: 'Septiembre - Diciembre', mes: 12 },
];

const CargaPeriodos = () => {
  const navigate = useNavigate();
  const handleNavigateEstatus = () => {
    navigate('/Estatus');
  };
  const handleNavigateCargaDatos = () => {
    navigate('/CargarDatos');
  };

  const anioActual = new Date().getFullYear();
  const mesActual = new Date().getMonth() + 1; // Enero es 0

  const [cuatrimestreSeleccionado, setCuatrimestreSeleccionado] = useState([
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
    { cuatri: "Cuatrimestre", mes: 0, anio: 0 },
  ]);

  const validar = () =>{
    let newCuatrimestreSeleccionado = cuatrimestreSeleccionado.map(selection => {
      if (selection.cuatri === "Cuatrimestre" || selection.anio === 0) {
        return selection;
      }
      if (selection.anio !== anioActual) {
        return selection;
      }
      if (mesActual <= 4 && selection.mes === 4) {
        return { ...selection, cuatri: "Cuatrimestre", mes: 0 };
      } else if (mesActual <= 8 && selection.mes === 8) {
        return { ...selection, cuatri: "Cuatrimestre", mes: 0 };
      } else if (mesActual <= 12 && selection.mes === 12) {
        return { ...selection, cuatri: "Cuatrimestre", mes: 0 };
      }
      return selection;
    });
    setCuatrimestreSeleccionado(newCuatrimestreSeleccionado)
  }

  const handleAnioChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const newSelections = [...cuatrimestreSeleccionado];
    newSelections[index].anio = parseInt(e.target.value, 10) || 0;
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
                      className="w-full p-2 border border-gray-500 rounded"
                      placeholder="Año"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button className="bg-orange-500 text-white font-bold px-8 py-2 rounded-xl">
              Cargar Archivos
            </button>
          </div>
          <div className="flex items-center justify-between py-2 w-full px-5">
            <span className="text-gray-600">Mostrando 2 de 3</span>
            <div>
              <button onClick={handleNavigateCargaDatos} className="text-gray-600 hover:text-gray-800 mx-2">Anterior</button>
              <button onClick={handleNavigateEstatus} className="text-gray-600 hover:text-gray-800 mx-2">Siguiente</button>
            </div>
          </div>
        </>
      }
    />
  );
};

export default CargaPeriodos;
