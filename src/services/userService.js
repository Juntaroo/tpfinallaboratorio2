import axios from 'axios';

const api = axios.create({//creo la contante api que lo que me va a permitir es utilizar los metodos de axios para las peticiones
  baseURL: 'http://localhost:3001/api',//en esta url voy a trabajar con la api montada ya que sino usa la misma y no se puede iniciar el proyecto
});//por defecto react se inicia en el puerto 3000

export const createUser = async (user) => {//funcion para crear el usuario con axios
  try {
    const response = await api.post('/users', user); //se pasa el objeto `user` como cuerpo de la solicitud
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
  }
};

export const updateUser = async (id, user) => {//funcion para actualizar el usuario con axios
  try {
    const response = await api.put(`/users/${id}`, user); //se pasa el id y el objeto user
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};


export const deleteUser = async (id) => {//funcion para eliminar el usuario con axios
  try {
    const response = await fetch(`http://localhost:3001/api/users/${id}`, { 
      method: 'DELETE',
    });
    const data = await response.json();
    if (response.ok) {
      return data; 
    } else {
      throw new Error(data.message || 'Error al eliminar el usuario');
    }
  } catch (error) {
    throw error;
  }
};


export const getUsers = async () => {//funcion para obtener los usuarios con axios
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

export const getUserById = async (id) => {//funcion para obtener el usuario por id
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario por id:', error);
  }
};