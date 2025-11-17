import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/Navbar.css"; 

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  const noNavbarRoutes = ["/login", "/signup", "/", "/forgot-password",
  "/reset-password"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);


  if (hideNavbar) return null;

  const isLogged = !!user && !!token;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="navbar-brand">
          ClinicaApp
        </Link>
      </div>
      <div className="navbar-links">
        {isLogged && (
          <Link to="/mis-turnos" className="nav-link">
            Mis Turnos
          </Link>
        )}
        {isLogged && user?.rol === "Admin" && (
          <Link to="/admin-med" className="nav-link">
            Administrar Médicos
          </Link>
        )}
        {isLogged && user?.rol === "Admin" && (
          <Link to="/usuarios" className="nav-link">
            Administrar Usuarios
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
