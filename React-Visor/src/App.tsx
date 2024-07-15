import { ComponentType, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import HomeAdmin from './pages/homeAdmin.tsx';
import HomeDirectCar from './pages/HomeDirectCar.tsx';
import HomeSecrAcad from './pages/HomeSecrAcad.tsx';
import './App.css';
import About from './pages/About.tsx';
import ExportExcel from './pages/ExportExcel.tsx';
import DeleteDataView from './pages/DeleteData.tsx';
import Estatus from './pages/Estatus.tsx';
import CargaPeriodos from './pages/CargaPeriodos.tsx';
import CargarDatos from './pages/CargarDatos.tsx';
import PrivateRoute from './componets/privatereoute.tsx';
import DesempenoEscolar from './pages/desempleno.tsx';
import HomeSecretAcad from './pages/HomeSecrAcad.tsx';
import UserPermissionsView from './pages/UserPermissions.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/permison" element={<UserPermissionsView />} />
          <Route path="/HomeDirectCarr" element={<HomeDirectCar/>} />
          <Route path="/HomeSecretAcad" element={<HomeSecretAcad/>} />
          <Route path="/HomeAdmin" element={<HomeAdmin/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Excel" element={<ExportExcel />} />
          <Route path="/DeleteData" element={<DeleteDataView />}></Route>
          <Route path="/Estatus" element={<Estatus />} />
          <Route path="/CargaPeriodos" element={<CargaPeriodos />} />
          <Route path="/CargarDatos" element={<CargarDatos />} />
          <Route path="/DesempenoEscolar" element={<DesempenoEscolar userType='alumno' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
