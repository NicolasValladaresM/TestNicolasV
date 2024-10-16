import  useApiErrorHandler  from "../services/apiErrorHandler";

const GetMultiPrices = () => {
  const { handleApiResponse } = useApiErrorHandler();

  const GetPricesData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }
    const accessToken = user.access_token;
    const uid = user.uid;
    const client = user.client;
    const expiry = user.expiry;

    try {
      const response = await fetch(
        "https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices",
        {
          method: "GET",
          headers: {
            "app-name": "ANGIE",
            "access-token": accessToken,
            uid: uid,
            client: client,
            expiry: expiry,
          },
        }
      );
      await handleApiResponse(response);
      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.log("Error al obtener valores de monedas", error);
    }
  };

  return { GetPricesData };
};

export default GetMultiPrices;
