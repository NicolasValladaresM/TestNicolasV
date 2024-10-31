import  useApiErrorHandler  from "../services/apiErrorHandler";
import { getUserStorage } from "./auth";
import http from "./httpAxiosRequest";

const GetMultiPrices = () => {
  const { handleApiResponse } = useApiErrorHandler();

  const GetPricesData = async () => {
    
    const user = getUserStorage().user;

    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }

     


    try {
      const response = await http.get("/users/get_crypto_multi_prices")
      await handleApiResponse(response);
      console.log("Valores obtenidos getMultiprices", response);
      return response.data.prices;
    } catch (error) {
      console.log("Error al obtener valores de monedas", error);
    }
  };

  return { GetPricesData };
};

export default GetMultiPrices;
