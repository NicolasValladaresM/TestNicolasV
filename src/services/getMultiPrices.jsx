import  useApiErrorHandler  from "../services/apiErrorHandler";
import { getUserStorage } from "./auth";
import http from "./httpAxiosRequest";

const GetMultiPrices = () => {
  const { handleApiResponse } = useApiErrorHandler();

  const GetPricesData = async () => {
    
    const user = getUserStorage().user;

    // const headers = getUserStorage().headers;
    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }

      // const accessToken = headers.access_token;
      // const uid = headers.uid;
      // const client = headers.client;
      // const expiry = headers.expiry;

      // try {
      //   const response = await fetch(
      //     "https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices",
      //     {
      //       method: "GET",
      //       headers: {
      //         "app-name": "ANGIE",
      //         "access-token": accessToken,
      //         uid: uid,
      //         client: client,
      //         expiry: expiry,
      //       },
      //     }
      //   );
      //   await handleApiResponse(response);
      //   const data = await response.json();
      //   return data.prices;
      // } catch (error) {
      //   console.log("Error al obtener valores de monedas", error);
      // }


    try {
      const response = await http.get("/users/get_crypto_multi_prices")
      await handleApiResponse(response);
      return response.data.prices;
    } catch (error) {
      console.log("Error al obtener valores de monedas", error);
    }
  };

  return { GetPricesData };
};

export default GetMultiPrices;
