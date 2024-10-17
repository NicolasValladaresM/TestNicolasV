import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { InfoContext } from "../context/infoContext";
const API_KEY = import.meta.env.VITE_API_KEY;
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useContext(UserContext);
  const { setInfo } = useContext(InfoContext);

  const getData = async (email, password) => {
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);
      params.append("dev_mode", "true");

      const response = await fetch(
        "https://api.qa.vitawallet.io/api/auth/sign_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization: `Bearer ${API_KEY}`,
            "app-name": "ANGIE",
          },
          body: params,
        }
      );

      const accessToken = response.headers.get("access-token");
      const uid = response.headers.get("uid");
      const expiry = response.headers.get("expiry");
      const client = response.headers.get("client");

      const headers = {
        access_token: accessToken,
        uid: uid,
        expiry: expiry,
        client: client,
      };

      setInfo(headers);

      const data = await response.json();
      console.log(data);
      if (data.data) {
        const user = {
          email: data.data.attributes.email,
          token_generic_btc: data.data.attributes.btc_address,
          access_token: accessToken,
          uid: uid,
          expiry: expiry,
          client: client,
        };

        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        setSuccess("Inicio de sesión exitoso");

        return true;
      } else {
        setError("Email no existe");
        setSuccess("");
        return false;
      }
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };
  return {
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    getData,
    setError,
  };
};

export default useLogin;
