import { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  component: ComponentType<any>;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !auth.user) {
      navigate('/');
      return;
    }

    const { email } = auth.user;
    const emailDomain = email.split('@')[1];

    if (emailDomain !== 'upqroo.edu.mx') {
      auth.logout();
      navigate('/');
    }
  }, [auth, navigate]);

  if (!auth || !auth.user) {
    return null; 
  }

  return <Component {...rest} />;
}

export default PrivateRoute;
