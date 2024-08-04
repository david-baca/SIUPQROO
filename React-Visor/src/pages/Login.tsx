import { useAuth } from '../context/AuthContext.js';
import instance from '../api/axios.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  saveToLocalStorage,
  getFromLocalStorage
} from '../context/Credentials.js';

import GoogleIcon from '@mui/icons-material/Google';
import LogoUPQROO from '../../public/logoUPQROO.png';
import fondoUPQROO from '../../public/LogoCafe.jpg';

function Login() {
  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const local = getFromLocalStorage();
    if (local) {
      if (local.rol === 'director') {
        navigate('/HomeDirectCarr');
      } else if (local.rol === 'secretario') {
        navigate('/HomeSecretAcad');
      } else if (local.rol === 'administrador') {
        navigate('/HomeAdmin');
      }
    }
  }, [navigate]);

  const handleGoogle = async (e: any) => {
    e.preventDefault();

    if (!auth) {
      console.error('Auth context is not available');
      return;
    }

    try {
      const credential = await auth.loginWithGoogle();
      const { email } = credential.user;

      const response = await instance.get(`/user/read/email/${email}`);

      if (response.status === 200) {
        saveToLocalStorage(response.data);
        if (response.data.rol === 'director') {
          navigate('/HomeDirectCarr');
        } else if (response.data.rol === 'secretario') {
          navigate('/HomeSecretAcad');
        } else if (response.data.rol === 'administrador') {
          navigate('/HomeAdmin');
        }
      }
    } catch (e) {
      console.log('Error al leer el email de la base de datos', e);
      auth.logout();
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src={fondoUPQROO}
          alt="Fondo UPQROO"
        />
      </div>
      <div className="h-[25rem] w-[100%] md:w-[27rem] relative flex flex-col items-center p-10 bg-white shadow-lg rounded-md max-w-md">
        <img
          className="w-auto h-[5rem] my-8"
          src={LogoUPQROO}
          alt="Logo UPQROO"
        />
        <div className="flex flex-col mb-4 w-full">
          <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
          <p className="text-gray-600 font-medium">
            Con una cuenta institucional (@upqroo.edu.mx)
          </p>
        </div>
        <button
          className="flex items-center justify-center w-full py-2 mt-4 border rounded bg-white text-gray-700 hover:bg-gray-100"
          onClick={(e) => handleGoogle(e)}>
          <GoogleIcon className="mr-2" />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
