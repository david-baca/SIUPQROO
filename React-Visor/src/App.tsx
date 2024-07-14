import { ComponentType, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import Home from '../src/pages/home.tsx';
import './App.css';
import About from './pages/About.tsx';
import ExportExcel from './pages/ExportExcel.tsx';
import DeleteData from './pages/DeleteData.tsx';

interface PrivateRouteProps {
  component: ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/');
      return;
    }

    if (!auth.user) {
      navigate('/');
    } else {
      const { email } = auth.user || {};
      const arrayResults = email.split('@');

      if (arrayResults[1] !== 'upqroo.edu.mx') {
        console.log('No eres estudiante');
        auth.logout();
        navigate('/');
      }
    }
  }, [auth, navigate]);

  if (!auth || !auth.user) {
    return null;
  }

  return <Component {...rest} />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<PrivateRoute component={Home} />} />
          <Route path="/About" element={<About />} />
          <Route path="/Excel" element={<ExportExcel />} />
          <Route path="/DeleteData" element={<DeleteData />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
