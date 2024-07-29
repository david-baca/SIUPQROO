import React, { useState, useEffect } from 'react';
import InterfaceModel from './interfaceModel';
import FloadCreating from '../components/FloadCreating';
import FloadEditing from '../components/FloadEditing'; 
import DeleteConfirmation from '../components/DeleteConfirmation'; 
import DirectorTD from '../components/DirectorTD';
import SecreTD from '../components/SecreTD';
import instance from '../api/axios';

const UserPermissionsView: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<{ isOpen: boolean; userId?: number }>({ isOpen: false });
  const [openDelete, setOpenDelete] = useState<{ isOpen: boolean; userId?: number }>({ isOpen: false });

  const fetchUsers = async () => {
    try {
      const usersResponse = await instance.get('/user/read'); 
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
    fetchUsers(); 
    setOpenCreate(false);
  };

  const handleClickOpenEdit = (userId: number) => {
    setOpenEdit({ isOpen: true, userId });
  };

  const handleCloseEdit = () => {
    fetchUsers(); 
    setOpenEdit({ isOpen: false });
  };

  const handleClickOpenDelete = (userId: number) => {
    setOpenDelete({ isOpen: true, userId });
  };

  const handleCloseDelete = () => {
    fetchUsers(); 
    setOpenDelete({ isOpen: false });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <InterfaceModel
        userType="Administrador"
        titleSection="Administración de Permisos"
        titleAction="Estos son los permisos de SIUPQROO."
        subtitleAction="Los cambios son en tiempo real"
        contenido={
          <>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <div className='flex justify-start pb-5'>
                <button onClick={handleClickOpenCreate} className='bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600'>Crear usuario</button>
              </div>
              <div className="overflow-x-auto">
                <table className='w-full text-center border-collapse'>
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border px-4 py-2">Usuario</th>
                      <th className="border px-4 py-2">Director de Carrera</th>
                      <th className="border px-4 py-2">Secretario Académico</th>
                      <th className="border px-4 py-2">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.pk} className="border-t">
                        <td className="border px-4 py-2">{user.correo}</td>
                        <td className="border px-4 py-2 justify-center items-center"><DirectorTD user={user}/></td>
                        <td className="border px-4 py-2 justify-center items-center"><SecreTD user={user}/></td>
                        <td className="border px-4 py-2 flex justify-center space-x-2">
                          <button onClick={() => handleClickOpenEdit(user.pk)} className='bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 flex items-center space-x-1'>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                            <span>Editar</span>
                          </button>
                          <button onClick={() => handleClickOpenDelete(user.pk)} className='bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 flex items-center space-x-1'>
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            <span>Eliminar</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
