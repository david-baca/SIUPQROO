import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext.js';

import Login from './pages/Login';
import Home from '../src/pages/home.tsx';
import About from './pages/About.tsx';
import ExportExcel from './pages/ExportExcel.tsx';
import SecretarioAcademico from './pages/SecretarioAcademico.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute component={Home} />} />
          <Route path="/About" element={<PrivateRoute component={About} />} />
          <Route
            path="/Excel"
            element={<PrivateRoute component={ExportExcel} />}
          />
          <Route
            path="/DesempenoEscolar"
            element={<PrivateRoute component={SecretarioAcademico} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
