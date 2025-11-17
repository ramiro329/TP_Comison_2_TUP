import { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuariosService";
import "../styles/MainUsuarios.css";

const MainUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    MailUsuario: "",
    PasswordUsuario: "",
    RolUsuario: "Paciente",
  });
  const [editId, setEditId] = useState(null);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await actualizarUsuario(editId, form);
      setEditId(null);
    } else {
      await crearUsuario(form);
    }

    setForm({
      MailUsuario: "",
      PasswordUsuario: "",
      RolUsuario: "Paciente",
    });

    cargarUsuarios();
  };

  const handleEdit = (usuario) => {
    setEditId(usuario.idUsuario);
    setForm({
      MailUsuario: usuario.MailUsuario,
      PasswordUsuario: "",
      RolUsuario: usuario.RolUsuario,
    });
  };

  const handleDelete = async (id) => {
    await eliminarUsuario(id);
    cargarUsuarios();
  };

  return (
     <div>
     <div className="main-usuarios-container">

      <h2>Gestión de Usuarios</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="MailUsuario"
          placeholder="Email"
          value={form.MailUsuario}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="PasswordUsuario"
          placeholder="Contraseña"
          value={form.PasswordUsuario}
          onChange={handleChange}
          required={!editId}
        />

        <select
          name="RolUsuario"
          value={form.RolUsuario}
          onChange={handleChange}
        >
          <option value="Admin">Admin</option>
          <option value="Medico">Medico</option>
          <option value="Paciente">Paciente</option>
        </select>

        <button type="submit">
          {editId ? "Actualizar Usuario" : "Crear Usuario"}
        </button>
      </form>

      <hr />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.idUsuario}>
              <td>{u.idUsuario}</td>
              <td>{u.MailUsuario}</td>
              <td>{u.RolUsuario}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.idUsuario)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MainUsuarios;
