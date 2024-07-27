import { useEffect, useState } from 'react';
import InterfaceModel from './interfaceModel';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface DatoACargar {
  archivo: string;
  exist: boolean;
}

const CargarDatos = () => {
  const navigate = useNavigate();
  const [DatosACargar, setDatosACargar] = useState<DatoACargar[]>([]);
  const [fileErrors, setFileErrors] = useState<Record<string, string | null>>({});

  async function extraction() {
    try {
      const response = await axios.get<DatoACargar[]>('/check/preload');
      if (response.status === 200) {
        setDatosACargar(response.data);
      }
    } catch (error) {
      console.error('Error al extraer los datos:', error);
    }
  }

  useEffect(() => {
    extraction();
  }, []);

  const handleNavigateCargarperiodos = () => {
    navigate('/CargaPeriodos');
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, archivo: string) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name === archivo) {

        // Clear previous error
        setFileErrors(prevState => ({
          ...prevState,
          [archivo]: null
        }));

        // Create FormData and send the file to the API
        const formData = new FormData();
        formData.append('myFile', file);

        try {
          const response = await axios.post('/dbf/load', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.data.estado) {
            navigate(0)
          } else {
            console.error('Error al cargar el archivo');
            alert('Error al cargar el archivo');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud', error);
          alert('Error al realizar la solicitud');
        }
      } else {
        setFileErrors(prevState => ({
          ...prevState,
          [archivo]: `El archivo seleccionado no coincide con ${archivo}`
        }));
      }
    }
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
              <div key={index}>
                <div className="flex flex-row items-center my-2">
                  <h1 className="mr-1">Archivo</h1>
                  <h1 className="font-bold">{dato.archivo}</h1>
                </div>
                <div className='flex flex-row items-center justify-between bg-gray-200'>
                  <label className="bg-[#ec6b0c] w-[30%] text-center font-medium rounded-xl mx-4 my-2 cursor-pointer">
                    <span>Examinar</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileChange(e, dato.archivo)} 
                      accept=".dbf" 
                    />
                  </label>
                  {fileErrors[dato.archivo] ? (
                    <h1 className='font-medium text-red-600'>{fileErrors[dato.archivo]}</h1>
                  ) : (
                    <h1 className='font-medium'>{dato.exist ? 'Archivo ya cargado' : 'No se ha seleccionado ningún archivo'}</h1>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between py-2 w-full px-5">
            <span className="text-gray-600">Mostrando 1 de {DatosACargar.length}</span>
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
