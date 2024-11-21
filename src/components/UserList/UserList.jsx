import React from 'react';
import { DataTable, Column, Button } from 'primereact';
import { deleteUser } from '../../services/userService';
import "./UserList.css"

const UserList = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);  //eliminar el usuario por id
      onDelete(id);  //llamo a onDelete para actualizar la lista de usuarios
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="user-list-container">
       <h1 className='titulo'>Lista de usuarios</h1>
      <DataTable value={users} responsiveLayout="scroll">
        <Column field="id" header="ID" />
        <Column field="name" header="Nombre" />
        <Column field="email" header="Email" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <>
              <Button className="boton" label="Editar" onClick={() => onEdit(rowData)} />
              <Button className="boton" label="Borrar" onClick={() => handleDelete(rowData.id)} />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};


export default UserList;
