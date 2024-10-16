import  useApiErrorHandler  from "../services/apiErrorHandler";


const GetHistorical = () => {
  const { handleApiResponse } = useApiErrorHandler();
 
  const GetHistoryProfile = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }
    const accessToken = user.access_token;
    const uid = user.uid;
    const client = user.client;
    //const client = "1221mk";
    const expiry = user.expiry;

    try {
      const response = await fetch(
        "https://api.qa.vitawallet.io/api/transactions",
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
      return data.data;
    } catch (error) {
      console.log("Error al obtener el historial del usuario", error);
    }
  };
  return { GetHistoryProfile };
};

export default GetHistorical;
