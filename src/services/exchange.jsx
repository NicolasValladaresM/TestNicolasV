import { TransContext } from "../context/transContext";
import { useContext } from "react";
import { getUserStorage } from "../services/auth";
import http from "../services/httpAxiosRequest";

const Exchange = () => {
  const { origin, final, amount } = useContext(TransContext);

  const MakeExchange = async () => {
    const { user, headers } = getUserStorage();

    if (!user || !headers) {
      console.log("No se encontraron datos de usuario en localStorage");
      return;
    }

    try {
      if (origin && final && amount) {
        const originLower = origin.toLowerCase();
        const finalLower = final.toLowerCase();

        console.log("Valores de origin y final desde exchange", origin, final, amount);

        const response = await http.post(
          "/transactions/exchange",
          {
            currency_sent: originLower,
            currency_received: finalLower,
            amount_sent: amount,
          },
          
           headers 
        );

        console.log("Solicitud exitosa:", response.data);
        return false;
      } else {
        console.log("Falta seleccionar el tipo de transacción");
        return true;
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log("Error en la solicitud:", data);

        if (
          data.error === "Insufficient balance for admin" ||
          data.error === "Los precios han caducado, por favor intente de nuevo"
        ) {
          console.log(
            "Balance insuficiente por administrador o balances caducados"
          );
          return true;
        } else {
          console.log("Error al enviar la transacción", error);
        }

        return true;
      }else {
        console.log("Error inesperado", error);
      }

      
      
    }
  };

  return { MakeExchange };
};

export default Exchange;
