
import { getUserStorage } from "./auth";
import http from "./httpAxiosRequest";
const GetProfile = () => {

  const getDataProfile = async () => {

    const user = getUserStorage();

    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }

    try {
      const response = await http.get("/profile")
      return response.data;
    
    } catch (error) {
      console.log("Error al obtener el perfil del usuario", error);
    }
  };
  return { getDataProfile };
};

export default GetProfile;
