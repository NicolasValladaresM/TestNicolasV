import loginImage from "/loginImage.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import useLogin from "../../services/getData";
import eyeIcon from "../../assets/eye.svg";
import eyeOffIcon from "../../assets/eye_off.svg";
import checkIcon from "../../assets/check.svg";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/home");
    }
  }, [navigate]);

  const {
    email,
    password,
    error,
    success,
    getData,
    setEmail,
    setPassword,
    setError,
  } = useLogin();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, rellena todos los campos");
      return;
    }

    const isSuccess = await getData(email, password);
    console.log("El email es ", email);
    if (isSuccess) {
      navigate("/home");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailValue)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h1 className="login-in">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs-btn">
            <p className="credentials">Correo Electrónico</p>

            <div className="email-input-container">
              <input
                type="email"
                value={email}
                placeholder="juan@gmail.com"
                onChange={handleEmailChange}
              />
              {isEmailValid && (
                <span className="email-valid-icon">
                  <img
                    src={checkIcon}
                    alt="Correo válido"
                    width="24"
                    height="24"
                  />
                </span>
              )}
            </div>

            <p className="credentials">Contraseña</p>

            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={passwordVisible ? eyeIcon : eyeOffIcon}
                  alt={
                    passwordVisible
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                  width="24"
                  height="24"
                />
              </span>
            </div>

            <p className="forget">¿Olvidaste tu contraseña?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <div className="submit">
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </form>
      </div>
      <img src={loginImage} className="amico" alt="login" />
    </div>
  );
};

export default Login;
