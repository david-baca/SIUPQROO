import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../context/Credentials';

interface ChildProps {
  element: JSX.Element;
}

export const PrivateSecre: React.FC<ChildProps> = ({ element }) => {
  const local = getFromLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (local == null || local.rol !== 'secretario') {
      navigate('/');
    }
  }, [local, navigate]);

  return local && local.rol === 'secretario' ? element : null;
};

export const PrivateDirect: React.FC<ChildProps> = ({ element }) => {
  const local = getFromLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (local == null || local.rol !== 'director') {
      navigate('/');
    }
  }, [local, navigate]);

  return local && local.rol === 'director' ? element : null;
};

export const PrivateAdmin: React.FC<ChildProps> = ({ element }) => {
  const local = getFromLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (local == null || local.rol !== 'administrador') {
      navigate('/');
    }
  }, [local, navigate]);

  return local && local.rol === 'administrador' ? element : null;
};
