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

interface Carrera {
  pk: number;
  nombre: string;
  cant_grup: number;
  p_ap: number;
  p_rep: number;
}

export interface Director {
  fk_Usuario: number | null;
  fk_Carrera: number | null;
}

const DirectorTD: React.FC<UserTableRowProps> = ({ user }) => {
  const [careers, setCareers] = useState<Carrera[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<number | null>(user.directorCareerId);

  const fetchCareersAndDirector = async () => {
    try {
      // Fetch careers first
      const careersResponse = await axios.get('/carrera/read');
      const allCareers = [{ pk: 0, nombre: "Sin permiso", cant_grup: 0, p_ap: 0, p_rep: 0 }, ...careersResponse.data];
      setCareers(allCareers);

      // Then fetch the director's career
      const directorResponse = await axios.get(`/user/directors/${user.pk}`);
      if (directorResponse.data != null) {
        const selectedCareerId = directorResponse.data.fk_Carrera;
        const foundCareer = allCareers.find(career => career.pk === selectedCareerId);
        if (foundCareer) {
          setSelectedCareer(foundCareer.pk);
        } else {
          setSelectedCareer(0);
        }
      } else {
        setSelectedCareer(0);
      }
    } catch (error) {
      setSelectedCareer(0);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchCareersAndDirector();
  }, [user.pk]);

  const handleCareerChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const careerId = parseInt(e.target.value, 10);
    try {
      if (selectedCareer !== 0) {
        await axios.delete(`/user/directors/delete/${user.pk}`);
      }
      if (careerId !== 0) {
        await axios.post('/user/directors/create', { fk_Usuario: user.pk, fk_Carrera: careerId });
      }
      setSelectedCareer(careerId);
    } catch (error) {
      console.error('Error changing career:', error);
    }
  };

  return (
      <select
        value={selectedCareer !== null ? selectedCareer : ''}
        onChange={handleCareerChange}
      >
        {careers.map((career) => (
          <option key={career.pk} value={career.pk}>
            {career.nombre}
          </option>
        ))}
      </select>
  );
};

export default DirectorTD;
