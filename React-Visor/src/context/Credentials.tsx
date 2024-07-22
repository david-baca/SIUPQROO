import { KEY_CREDETIAL } from '../env';

interface Credencial {
  pk: number;
  correo: string;
  rol: string;
  fk_Carrera: number | null;
}

// Función para guardar las credenciales en localStorage
export const saveToLocalStorage = (credencial: Credencial) => {
  // Convierte el objeto de credenciales a una cadena JSON antes de almacenarlo
  localStorage.setItem(KEY_CREDETIAL, JSON.stringify(credencial));
};

// Función para obtener las credenciales desde localStorage
export const getFromLocalStorage = (): Credencial | null => {
  // Obtiene la cadena JSON desde localStorage y la convierte de nuevo a un objeto
  const credencialString = localStorage.getItem(KEY_CREDETIAL);
  return credencialString ? JSON.parse(credencialString) : null;
};

// Función para limpiar las credenciales desde localStorage
export const clearFromLocalStorage = () => {
  localStorage.removeItem(KEY_CREDETIAL);
};