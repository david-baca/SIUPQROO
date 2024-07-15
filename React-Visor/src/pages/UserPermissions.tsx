import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import InterfaceModel from './interfaceModel';
import FloadCreating from '../componets/FloadCreating'; // Componente modal de creación de usuario
import FloadEditing from '../componets/FloadEditing'; // Componente modal de edición de usuario
import DeleteConfirmation from '../componets/DeleteConfirmation'; // Componente modal de confirmación de eliminación
import AdminTD from '../componets/AdminTD';
import DirectorTD from '../componets/DirectorTD';
import SecreTD from '../componets/SecreTD';

const UserPermissionsView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<{ isOpen: boolean; userId?: number }>({ isOpen: false });
  const [openDelete, setOpenDelete] = useState<{ isOpen: boolean; userId?: number }>({ isOpen: false });

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const usersResponse = await axios.get('/user/read'); // Endpoint para obtener usuarios
      setUsers(usersResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    fetchUsers(); // Actualizar usuarios después de cerrar el modal de creación
    setOpenCreate(false);
  };

  const handleClickOpenEdit = (userId: number) => {
    setOpenEdit({ isOpen: true, userId });
  };

  const handleCloseEdit = () => {
    fetchUsers(); // Actualizar usuarios después de cerrar el modal de edición
    setOpenEdit({ isOpen: false });
  };

  const handleClickOpenDelete = (userId: number) => {
    setOpenDelete({ isOpen: true, userId });
  };

  const handleCloseDelete = () => {
    fetchUsers(); // Actualizar usuarios después de cerrar el modal de eliminación
    setOpenDelete({ isOpen: false });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <InterfaceModel
        userType="Administrador"
        titleSection="Administracion de Permisos"
        titleAction="Estos son los permisos de SIUPQROO."
        subtitleAction="Los cambios son en tiempo real"
        contenido={
          <>
            <div>
              <div className='flex justify-end pb-5'>
                <button onClick={handleClickOpenCreate} className='bg-green-300 p-2'>Crear usuario</button>
              </div>
              <table className='w-full text-center'>
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Admin</th>
                    <th>Director de Carrera</th>
                    <th>Secretario Académico</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody className='border border-5 border-b-gray-950'>
                  {users.map((user) => (
                    <tr key={user.pk}>
                      <td>{user.correo}</td>
                      <AdminTD user={user} />
                      <DirectorTD user={user}/>
                      <SecreTD user={user}/>
                      <td>
                        <button onClick={() => handleClickOpenEdit(user.pk)} className='bg-yellow-300 p-2'>Editar</button>
                        <button onClick={() => handleClickOpenDelete(user.pk)} className='bg-red-300 p-2'>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        }
      />

      {openCreate && (
        <FloadCreating handleCloseCreate={handleCloseCreate} />
      )}

      {openEdit.isOpen && (
        <FloadEditing user={users.find(user => user.pk === openEdit.userId)} handleCloseEdit={handleCloseEdit} />
      )}

      {openDelete.isOpen && (
        <DeleteConfirmation userId={openDelete.userId} handleCloseDelete={handleCloseDelete} />
      )}
    </>
  );
};

export default UserPermissionsView;
