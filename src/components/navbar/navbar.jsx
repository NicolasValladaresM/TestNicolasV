import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import "./navbar.css";

const Navbar = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const na = useNavigate();

  return (
    <div className="navbar">
      <div className="nav">
        <button className="nav-button" onClick={() => na("/home")}>
          Inicio
        </button>
        <button className="nav-button" onClick={() => na("/home")}>
          Transferir
        </button>
        <button className="nav-button" onClick={() => na("/home")}>
          Recargar
        </button>
        <button className="nav-button" onClick={() => na("/interchange")}>
          Intercambiar
        </button>
        <button className="nav-button" onClick={() => na("/home")}>
          Perfil
        </button>
        <button className="nav-button" onClick={() => na("/home")}>
          Ayuda
        </button>
        <button
          className="nav-button-logout"
          onClick={() => {
            logout();
            na("/");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
