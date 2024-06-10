import { ComponentType, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.tsx';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Home',
    element: <PrivateRoute component={Home} />
  }
]);

interface PrivateRouteProps {
  component: ComponentType<any>; 
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [auth.user, navigate, auth.logout]);

  if (!auth.user) {
    return null; 
  }

  return <Component {...rest} />;
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
