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

export interface Administradores {
  fk_Usuario: number | null;
}

const AdminTD: React.FC<UserTableRowProps> = ({ user }) => {
  const [isAdmin, setIsAdmin] = useState<Administradores | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`/user/admin/${user.pk}`);
        setIsAdmin(response.data ? response.data : { fk_Usuario: null });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchAdmin();
  }, [user.pk]);

  const handleAdminChange = async () => {
    try {
      if (isAdmin?.fk_Usuario != null) {
        await axios.delete(`/user/admin/delete/${user.pk}`);
        setIsAdmin({ fk_Usuario: null });
      } else {
        await axios.post('/user/admin/create', { fk_Usuario: user.pk });
        setIsAdmin({ fk_Usuario: user.pk });
      }
    } catch (error) {
      console.error('Error toggling admin permission:', error);
    }
  };

  return (
    <td>
      <input
        type="checkbox"
        checked={isAdmin?.fk_Usuario != null}
        onChange={handleAdminChange}
      />
    </td>
  );
};

export default AdminTD;
