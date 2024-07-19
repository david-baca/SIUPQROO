import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google'; // Si prefieres, puedes usar una librería de iconos compatible con Tailwind
import LogoUPQROO from '../../public/logoUPQROO.png';
import fondoUPQROO from '../../public/LogoCafe.jpg';
import axios, { AxiosResponse } from 'axios';

interface User {
  pk: number;
  correo: string;
}


function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async (e: any) => {
    e.preventDefault();

    if (!auth) {
      console.error('Auth context is not available');
      return;
    }

    try {
      await auth.loginWithGoogle();

      const { email } = auth.user || {};

      if (!email) return;

      try {
        const response: AxiosResponse<User> = await axios.get(`/users/email/${email}`);

        if (response.status === 200) {
          navigate('/Home');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          await auth.logout();
        } else {
          console.error('Error during login:', error);
        }
      }

    } catch (error) {
      console.error('Error during login:', error);
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
          <p className="text-gray-600 font-medium">Con una cuenta institucional (@upqroo.edu.mx)</p>
        </div>
        <button
          className="flex items-center justify-center w-full py-2 mt-4 border rounded bg-white text-gray-700 hover:bg-gray-100"
          onClick={(e) => handleGoogle(e)}
        >
          <GoogleIcon className="mr-2" />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
