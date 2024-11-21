import React, { useState } from 'react';
import { InputText, Button } from 'primereact';
import { createUser, updateUser } from '../../services/userService';
import * as Yup from 'yup';//con esta libreria voy a validar los campos
import "./UserForm.css"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//creo un esquema de validación para el formulario
const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("El correo electrónico no es válido") //validación de correo
    .required("El correo electrónico es obligatorio")
});

const UserForm = ({ selectedUser, onRefresh }) => {
  const [user, setUser] = useState(selectedUser || { name: '', email: '' });

  //estado de snackbar(libreria)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const triggerSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(user, { abortEarly: false }); //valido los datos
      if (user.id) {
        await updateUser(user.id, user);
        triggerSnackbar('Usuario actualizado correctamente', 'success'); //mensaje para actualización
      } else {
        await createUser(user);
        triggerSnackbar('Usuario creado correctamente', 'success'); //mensaje para creación
      }
      onRefresh(); //refresco los datos o la vista
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        alert(error.errors[0]); //muestro el primer error de validación
      }
    }
  };
  

  return (
    <div className="user-form-container">
    {/* Snackbar global */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
{ 
    <div className="">
      <h1 className='titulo'>Crear un nuevo usuario</h1>
      <InputText
        value={user.name}
        name="name"
        placeholder="Nombre"
        onChange={handleChange}
        className="input-text"
      />
      <InputText
        value={user.email}
        name="email"
        placeholder="Email"
        onChange={handleChange}
        type="email"
        required
        className="input-text"
      />
      <Button label="Guardar" onClick={handleSubmit} className="boton" />
    </div>}
  </div>
  );
};


export default UserForm;
