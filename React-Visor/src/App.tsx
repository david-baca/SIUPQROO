import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext.js';
import HomeAdmin from './pages/homeAdmin.tsx';
import HomeDirectCar from './pages/HomeDirectCar.tsx';
import './App.css';
import { Valid, Invalid } from './pages/DeleteData.tsx';
import { Fallo, Cargando, Exitoso } from './components/waitingRoom.tsx';
import CargaPeriodos from './pages/CargaPeriodos.tsx';
import CargarDatos from './pages/CargarDatos.tsx';
import {
  PrivateSecre,
  PrivateDirect,
  PrivateAdmin
} from './components/PrivateRoute.tsx';
import HomeSecretAcad from './pages/HomeSecrAcad.tsx';
import UserPermissionsView from './pages/UserPermissions.tsx';
import { useEffect, useState } from 'react';
import axios from './api/axios.tsx';
import { io } from 'socket.io-client';
const port_socket = import.meta.env.VITE_BASE_URL_SOCKET;
const socket = io(port_socket);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/HomeAdmin"
            element={<PrivateAdmin element={<HomeAdmin />} />}
          />
          <Route path="/Permisos" element={<PrivateAdmin element={<UserPermissionsView />}/>} />
          <Route
            path="/DeleteData"
            element={
              <PrivateAdmin
                element={
                  <GestorAdmin
                    Valid={<Valid />}
                    Invalid={<Invalid />}
                    Fallo={<Fallo />}
                    Cargando={<Cargando />}
                  />
                }
              />
            }
          />
          <Route
            path="/CargaPeriodos"
            element={
              <PrivateAdmin
                element={
                  <GestorAdmin
                    Valid={<Exitoso />}
                    Invalid={<CargaPeriodos />}
                    Fallo={<Fallo />}
                    Cargando={<Cargando />}
                  />
                }
              />
            }
          />
          <Route
            path="/CargarDatos"
            element={
              <PrivateAdmin
                element={
                  <GestorAdmin
                    Valid={<Exitoso />}
                    Invalid={<CargarDatos />}
                    Fallo={<Fallo />}
                    Cargando={<Cargando />}
                  />
                }
              />
            }
          />
          <Route
            path="/HomeDirectCarr"
            element={
              <PrivateDirect
                element={
                  <GestorAdmin
                    Valid={<HomeDirectCar />}
                    Invalid={<HomeDirectCar />}
                    Fallo={<HomeDirectCar />}
                    Cargando={<Cargando />}
                  />
                }
              />
            }
          />
          <Route
            path="/HomeSecretAcad"
            element={
              <PrivateSecre
                element={
                  <GestorAdmin
                    Valid={<HomeSecretAcad />}
                    Invalid={<HomeSecretAcad />}
                    Fallo={<HomeSecretAcad />}
                    Cargando={<Cargando />}
                  />
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

interface ChildDesition {
  Valid: JSX.Element;
  Invalid: JSX.Element;
  Fallo: JSX.Element;
  Cargando: JSX.Element;
}

export const GestorAdmin: React.FC<ChildDesition> = ({
  Valid,
  Invalid,
  Fallo,
  Cargando
}) => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('¡estoy dentro!')
    });
    socket.on('procesado',() => {
      console.log('¡Evento ejecutado recibido!');
      navigate(0)
    });
    return()=>{
      socket.off('procesado');
      socket.off('connect');
    }
  }, []);
  const navigate = useNavigate();
  const [estado, setEstado] = useState(0);

  const validar = async () => {
    try {
      const response = await axios.get(`/check/estado`);
      if (response.data.mensaje === 'Terminado') setEstado(1);
      else if (response.data.mensaje === 'Sin cargar') setEstado(2);
      else if (response.data.mensaje === 'Fallo') setEstado(3);
      else if (response.data.mensaje === 'Cargando...') setEstado(4);
    } catch (error) {
      // Manejar el error, tal vez con una notificación o estado de error
      console.error('Error al validar estado:', error);
    }
  };

  useEffect(() => {
    validar();
  }, []);

  // Asegúrate de devolver un JSX en todos los casos
  switch (estado) {
    case 1:
      return Valid;
    case 2:
      return Invalid;
    case 3:
      return Fallo;
    case 4:
      return Cargando;
    default:
      return <div>Cargando...</div>; // O cualquier otro JSX que desees mostrar cuando el estado es 0
  }
};

export default App;
