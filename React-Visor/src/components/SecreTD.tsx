import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

interface UserTableRowProps {
  user: Usuario;
}

export interface Usuario {
  pk: number;
  correo: string;
  isAdmin: boolean;
  isSecretaryAcademic: boolean;
  directorCareerId: number | null;
}

export interface SecretarioAcademico {
  fk_Usuario: number | null;
}

const SecreTD: React.FC<UserTableRowProps> = ({ user }) => {
  const [isSecre, setIsSecre] = useState<SecretarioAcademico | null>(null);

  useEffect(() => {
    const fetchSecre = async () => {
      try {
        const response = await axios.get(`/user/secreacad/${user.pk}`);
        setIsSecre(response.data ? response.data : { fk_Usuario: null });
      } catch (error) {
        console.error('Error fetching secreacad data:', error);
      }
    };
    fetchSecre();
  }, [user.pk]);

  const handleSecreChange = async () => {
    try {
      if (isSecre?.fk_Usuario != null) {
        await axios.delete(`/user/secreacad/delete/${user.pk}`);
        setIsSecre({ fk_Usuario: null });
      } else {
        await axios.post('/user/secreacad/create', { fk_Usuario: user.pk });
        setIsSecre({ fk_Usuario: user.pk });
      }
    } catch (error) {
      console.error('Error toggling secreacad permission:', error);
    }
  };

  return (
    <input
      type="checkbox"
      checked={isSecre?.fk_Usuario != null}
      onChange={handleSecreChange}
    />
  );
};

export default SecreTD;
