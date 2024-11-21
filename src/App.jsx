import React, { useEffect, useState } from 'react';
import UserList from './components/UserList/UserList';
import UserForm from './components/UserForm/UserForm';
import UserEditForm from './components/UserEditForm/UserEditForm';
import { getUsers } from './services/userService';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./App.css"

//Utilicé la libreria concurrently para poder hacer que con npm start se inicie mi frontend y backend al mismo tiempo
//con el comando npm start

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editing, setEditing] = useState(false); //esto es para ir controlando si se está editando un usuario

  //estado de snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const triggerSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  //con esta funcion cargo los usuarios
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      if (response && Array.isArray(response)) {
        setUsers(response);
      } else {
        console.error("No hay datos en la respuesta");
      }
    } catch (error) {
      console.error("Error al traer los usuarios", error);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  //traigo a loadUsers cuando el componente se monte
  useEffect(() => {
    loadUsers();
  }, []);

  //con esta funcion se maneja la eliminación de un usuario
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id)); //filtro el usuario eliminado
    triggerSnackbar('Usuario eliminado correctamente', 'success');
  };
  //Con esta funcion se edita el usuario
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditing(true); //se muestra el formulario de edicion
  };

  //con esta funcion se maneja el guardado del usuario editado
  const handleSave = () => {
    loadUsers(); //recargo la lista de usuarios
    setEditing(false); //se cierra el formulario de edición
    setSelectedUser(null);
  };

  //con esta funcion se maneja la cancelación de la edición
  const handleCancel = () => {
    setEditing(false); //se cierra el formulario de edición sin guardar
    setSelectedUser(null);
  };



  return (
    <div className="App">
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

    {/* Spinner de carga */}
    {loading ? (
      <div className="spinner-container">
        <ProgressSpinner />
      </div>
    ) : (
      <>
        <h1 className="titulo">Bienvenido al CRUD de Usuarios</h1>
        {editing && selectedUser ? (
          <UserEditForm user={selectedUser} onSave={handleSave} onCancel={handleCancel} />
        ) : (
          <>
            <UserForm selectedUser={selectedUser} onRefresh={loadUsers} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </>
    )}
  </div>
  );
}

export default App;
