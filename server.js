import express from "express"
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors()); //con esto permito que mi frontend en http://localhost:3000 acceda a mi backend
app.use(express.json()); //esto es un middleware para parsear JSON

let users = [
];

//se obtienen los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

//creo un nuevo usuario
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1; //le estoy asignando desde el backend el id, el usuario no tiene que hacer eso
  users.push(newUser);
  res.status(201).json(newUser);
});

//obtengo el usuario por id
app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
});

//actualizo el usuario con el metodo put
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  //se busca el usuario por id
  const userIndex = users.findIndex((u) => u.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).send({ message: "Usuario no encontrado" });
  }

  //se actualizan solo los campos de name y email
  users[userIndex] = { ...users[userIndex], name, email };

  res.status(200).send({ message: "Usuario actualizado", user: users[userIndex] });
});


//con la funcion delete, elimino los usuarios
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {//se filtra el usuario por id
    const result = users.filter(user => user.id !== parseInt(id)); //con esto se elimina usuario en memoria
    if (result.length < users.length) {
      users = result;  //se actualiza la lista de usuarios después de borrar el usuario
      res.status(200).send({ message: "Usuario eliminado" });
    } else {
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el usuario", error });
  }
});

//iniciar mi servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
