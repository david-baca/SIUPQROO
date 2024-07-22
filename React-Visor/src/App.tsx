import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext.js';
import HomeAdmin from './pages/homeAdmin.tsx';
import HomeDirectCar from './pages/HomeDirectCar.tsx';
import './App.css';
import DeleteDataView from './pages/DeleteData.tsx';
import Estatus from './pages/Estatus.tsx';
import CargaPeriodos from './pages/CargaPeriodos.tsx';
import CargarDatos from './pages/CargarDatos.tsx';
import { PrivateSecre, PrivateDirect, PrivateAdmin } from './componets/privatereoute.tsx';
import HomeSecretAcad from './pages/HomeSecrAcad.tsx';
import UserPermissionsView from './pages/UserPermissions.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/HomeAdmin" element={<PrivateAdmin element={<HomeAdmin />} />} />
          <Route path="/permison" element={<UserPermissionsView />} />
          <Route path="/DeleteData" element={<PrivateAdmin element={<DeleteDataView />} />} />
          <Route path="/Estatus" element={<PrivateAdmin element={<Estatus />} />} />
          <Route path="/CargaPeriodos" element={<PrivateAdmin element={<CargaPeriodos />} />} />
          <Route path="/CargarDatos" element={<PrivateAdmin element={<CargarDatos />} />} />
          <Route path="/HomeDirectCarr" element={<PrivateDirect element={<HomeDirectCar />} />} />
          <Route path="/HomeSecretAcad" element={<PrivateSecre element={<HomeSecretAcad />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
