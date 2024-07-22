import React, { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
import img from '../../public/image3.png';

export const DeleteDataView = () => {
    const [estado, setestado] = useState(0);
    const validar = async () => {
        try {
            const response = await axios.get(`/check/estado`);
            if(response.data.mensaje == "Terminado"){setestado(1)}
            setestado(2)
        } catch (error) {
        }
    }
    useEffect(() => {
        validar();
    },[]);

    if (estado == 0) {return}
    if (estado == 1) {return <Valid/>;}
    if (estado == 2) {return <Invalid/>;}
};

export const Valid =() =>{
    const navigate = useNavigate();

    const handleNavigateHome = () => {
      navigate('/HomeAdmin');
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        // TODO
        handleClose();
    };

    const periods = [
        { period: 'Enero - Abril', year: 2020 },
        { period: 'Mayo - Agosto', year: 2020 },
        { period: 'Septiembre - Diciembre', year: 2020 },
    ];
    return (
    <>
        <InterfaceModel
            userType="Administrador"
            titleSection="Eliminar datos guardados"
            titleAction="Puedes eliminar los siguientes datos"
            subtitleAction=""
            contenido={<><table className="min-w-full divide-y divide-gray-200">
            <thead className="">
                <tr>
                    <th className="border border-black border-5 px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Periodo Cuatrimestral</th>
                    <th className="border border-black border-5 px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">Año</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {periods.map((row, index) => (
                    <tr key={index}>
                        <td className="border border-black border-5 px-6 py-4 text-center">{row.period}</td>
                        <td className="border border-black border-5 px-6 py-4 text-center">{row.year}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            <div className="flex justify-end my-6 mx-5">
                    <button className="font-bold mr-2 bg-[#ec6b0c] text-white py-2 px-4 rounded-xl" onClick={handleNavigateHome}>
                        Volver a la página principal
                    </button>
                    <button className="font-bold bg-[#DC3545] text-white py-2 px-4 rounded-xl flex items-center" onClick={handleClickOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1 bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        Eliminar todo 
                    </button>
                </div>
            </>}
        />
        {open && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 shadow-sm">
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <div className='bg-red flex flex-row justify-between'>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            Eliminar
                                        </h3>
                                        <button onClick={handleClose}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            ¿Estás seguro de que deseas eliminar los datos?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="g-bgray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-7 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleDelete}>
                                Sí
                            </button>
                            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-black shadow-sm px-7 py-1 bg-white text-base font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={handleClose}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}

export const Invalid =() =>{
    const navigate = useNavigate();

    const handleNavigateHome = () => {
      navigate('/HomeAdmin');
    };
    return (
    <>
        <InterfaceModel
            userType="Administrador"
            titleSection="Eliminar datos guardados"
            titleAction=""
            subtitleAction=""
            contenido={<>
            <div className="flex flex-col items-center">
                <h1 className='text-center font-bold text-xl'
                >¡Ups! Parece que no hay datos cargados, no puedes eliminar. </h1>
                <img className="w-[100%] md:w-[800px] h-auto" 
                    src={img}
                />
            </div>
            <div className="flex flex-col items-end">
                <button onClick={handleNavigateHome} className='bg-[#ff8702] text-white p-1 px-5 rounded-3xl'>
                    volver a la pagina anterior
                </button>
            </div>
            </>}
        />
    </>
    );
}
