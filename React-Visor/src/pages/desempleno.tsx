import React from 'react';
import '../styles/input.css';

interface Props {
  userType: string; // Tipo de usuario, por ejemplo: "Estudiante", "Profesor"
}

const DesempenoEscolar: React.FC<Props> = ({ userType }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-between items-center w-full px-5">
        <div className="flex items-center">
          <img 
            src="logoUPQROO.png" 
            alt="Universidad Politécnica de Quintana Roo" 
            className="h-10" 
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2">👤</span>
          <span className="font-normal">[Tipo de usuario {userType}]</span>
        </div>
      </div>
      <nav className="w-[90vw] py-3 mb-5">
        <h1>Bienvenido [Tipo de usuario {userType}]</h1>
      </nav>
     <div className="w-full max-w-3xl bg-white shadow-md rounded-lg mt-8">
        <div className="bg-[#590100] text-white text-xl font-semibold px-4 py-2 rounded-t-lg">
          <h2>Desempeño escolar</h2>
       </div>
       <div className="mb-2 text-start pb-5">
        <p>
          Estás a punto de descargar los indicadores de la universidad.
          ¡Esperamos que esta información sea de gran utilidad para ti!
        </p>
        <div className="flex items-center mt-4">
          <div className="flex-shrink-0">
            <img 
              src="imagendoña.png" 
              className="w-[256px] h-[257px]" 

            />
          </div>
          <div className="ml-4 flex-grow">
            <div className="flex flex-col space-y-2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-[413px] h-[30px]">
                Descargar desempeño Enero - Abril 2020
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-[413px] h-[30px]">
                Descargar desempeño Mayo - Agosto 2020
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-[413px] h-[30px]">
                Descargar desempeño Enero - Abril 2021
              </button> 
            </div>
          </div>
        </div>
      </div>

     </div>  

    </div>
  );
};

export default DesempenoEscolar;