import  useApiErrorHandler  from "../services/apiErrorHandler";
import { BalanceContext } from "../context/balanceContext";
import { useContext } from "react";
import { getUserStorage } from "../services/auth";
import http from "./httpAxiosRequest";
const GetBalance = () => {
  const { handleApiResponse } = useApiErrorHandler();
  const { setName } = useContext(BalanceContext);

  const GetBalancesData = async () => {
    const user = getUserStorage();

    if (!user) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }
    try {

      const response = await http.get("/profile");
      await handleApiResponse(response);
      setName(response.data.data.attributes.first_name);
      return response.data.data.attributes;


    } catch (error) {
      console.log("Error al obtener balances del usuario", error);
    }
  };
  return { GetBalancesData };
};

export default GetBalance;