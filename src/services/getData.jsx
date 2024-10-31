import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { InfoContext } from "../context/infoContext";
import { signIn } from "../services/httpAxiosRequest";
import { setUserStorage } from "./auth";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser } = useContext(UserContext);
  const { setInfo } = useContext(InfoContext);

  const getData = async (email, password) => {
    try {
      const { data, headers } = await signIn(email, password);
      setInfo(headers);

      if (data.data) {
        const user = {
          email: data.data.attributes.email,
          token_generic_btc: data.data.attributes.btc_address,
        };
        setUserStorage(user, headers);
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
