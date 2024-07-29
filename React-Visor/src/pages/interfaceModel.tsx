import React, { useState } from 'react';
import logo from '../../public/logoUPQROO.png';
import {clearFromLocalStorage} from "../context/Credentials"
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

interface Props {
  userType: string;
  titleSection: string;
  titleAction: string;
  subtitleAction: string;
  contenido: JSX.Element;
}

const interfaceModel: React.FC<Props> = ({ userType, titleSection, titleAction, subtitleAction, contenido }) => {
  const [mostrarCerrarSesion, setMostrarCerrarSesion] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  
  const exit=()=>{
    clearFromLocalStorage()
    auth?.logout();
    navigate(0);
  }
  return (
  
  <div className="h-[100vh] w-[100vw] flex flex-col items-center">
      <header className="sticky top-0 bg-white w-[100vw] px-10 py-1 flex justify-between border-gray-300 border-b-[3px]">
        <img 
          src={logo} 
          alt="Universidad Politécnica de Quintana Roo" 
          className="h-10" 
        />
        <div className="flex items-center relative" onClick={() => setMostrarCerrarSesion(!mostrarCerrarSesion)}>
        <span className="pr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </span>
        <span className="font-normal">{userType}</span>
        {mostrarCerrarSesion && (
          <div className='w-[120%] absolute bottom-[-140%]'>
            <div className='bg-orange-500 h-3' style={{ clipPath: 'polygon(65% 3%, 60% 100%, 70% 100%)' }}>
            </div>
            <div className="bg-orange-500 text-white p-2 font-bold flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="inline-block pr-1 bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
              <h1 onClick={exit} className=' inline-block p-0'>
                Cerrar sesión
              </h1>
            </div>
          </div>
        )}
      </div>
      
      
      </header>

      <section className="container p-4 flex flex-col h-[100%]">
        <h1 className="py-4 text-2xl font-bold">
          Bienvenido {userType}
        </h1>
        <div className="border border-black rounded-lg">
          <div className="bg-[#590100] text-white px-12 py-2 rounded-t-lg">
            <h2 className="text-lg font-bold">
              {titleSection}
            </h2>
          </div>
          <div className="md:px-12 py-5">
            <h2 className="text-lg font-medium">
              {titleAction}
            </h2>
            <h3 className="pb-5">
              {subtitleAction}
            </h3>
            <div className='h-min-[100] h-max-[100] w-100 overflow-hidden'>
                {contenido}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default interfaceModel;
