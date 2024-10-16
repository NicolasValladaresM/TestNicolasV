import { useContext } from "react";
import { InfoContext } from "../context/infoContext";

const GetProfile = () => {
  //const { info } =  useContext(InfoContext);

  const getDataProfile = async () => {
    // console.log("Headers obtenidos", info);

    // const accessToken = info.access_token;
    // const uid = info.uid;
    // const client = info.client;
    // const expiry = info.expiry;
    const user = JSON.parse(localStorage.getItem("user"));

    const accessToken = user.access_token;
    const uid = user.uid;
    const client = user.client;
    const expiry = user.expiry;

    try {
      const response = await fetch("https://api.qa.vitawallet.io/api/profile", {
        method: "GET",
        headers: {
          "app-name": "ANGIE",
          "access-token": accessToken,
          uid: uid,
          client: client,
          expiry: expiry,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error al obtener el perfil del usuario", error);
    }
  };
  return { getDataProfile };
};

export default GetProfile;
