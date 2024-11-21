import React, { useState, useEffect } from 'react';
import { Button, InputText } from 'primereact';
import { updateUser } from '../../services/userService';
import './UserEditForm.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UserEditForm = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Estado del Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const triggerSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUser = { name, email };
      await updateUser(user.id, updatedUser); // Actualiza el usuario en la API
      triggerSnackbar('Usuario actualizado correctamente', 'success');
      onSave(); // Llama a la función para refrescar la vista
    } catch (error) {
      console.error('Error updating user:', error);
      triggerSnackbar('Error al actualizar el usuario', 'error'); // Mensaje de error
    }
  };

  return (
    <div>
      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Formulario de edición */}
      <div className="user-edit-from-container">
        <h3>Editar Usuario</h3>
        <div className="columna">
          <label className="minititulo" htmlFor="id">
            ID
          </label>
          <InputText id="id" value={user.id} disabled />
        </div>
        <div className="columna">
          <label className="minititulo" htmlFor="name">
            Nombre
          </label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="columna">
          <label className="minititulo" htmlFor="email">
            Email
          </label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="botones">
          <Button className="boton" label="Guardar" onClick={handleSave} />
          <Button className="boton" label="Cancelar" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;