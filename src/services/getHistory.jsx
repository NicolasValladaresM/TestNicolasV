import  useApiErrorHandler  from "../services/apiErrorHandler";
import { getUserStorage } from "./auth";
import http from "./httpAxiosRequest";

const GetHistorical = () => {
  const { handleApiResponse } = useApiErrorHandler();
 
  const GetHistoryProfile = async () => {
    const { user, headers } = getUserStorage();

    if (!user || !headers) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }


    try {
      const response = await http.get("/transactions")
      await handleApiResponse(response);
      return response.data.data;
      
    } catch (error) {
      console.log("Error al obtener el historial del usuario", error);
    }
  };
  return { GetHistoryProfile };
};

export default GetHistorical;
