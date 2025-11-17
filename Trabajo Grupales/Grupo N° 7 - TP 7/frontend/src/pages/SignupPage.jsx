import { useState } from "react";
import { registerRequest } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css"; // Archivo CSS para tu formulario

function SignupPage() {
  const [MailUsuario, setMail] = useState("");
  const [PasswordUsuario, setPass] = useState("");
  const [RolUsuario, setRol] = useState("Paciente");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerRequest({ MailUsuario, PasswordUsuario, RolUsuario });
      alert("Usuario creado exitosamente");
      navigate("/login");
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registrarse</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Correo"
          value={MailUsuario}
          onChange={(e) => setMail(e.target.value)}
          required
          className="form-input"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={PasswordUsuario}
          onChange={(e) => setPass(e.target.value)}
          required
          className="form-input"
        />

        <select
          value={RolUsuario}
          onChange={(e) => setRol(e.target.value)}
          className="form-input"
        >
          
          <option value="Medico">Medico</option>
          <option value="Paciente">Paciente</option>
        </select>

        <button type="submit" className="form-button">
          Crear cuenta
        </button>
      </form>

      <p className="form-footer">
        ¿Ya tenés cuenta?{" "}
        <span className="form-link" onClick={() => navigate("/login")}>
          Iniciar sesión
        </span>
      </p>
    </div>
  );
}

export default SignupPage;
