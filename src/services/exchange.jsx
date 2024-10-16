import { TransContext } from "../context/transContext";
import { useContext } from "react";

const Exchange = () => {
  const { origin, final, amount, fromAmountResume } = useContext(TransContext);

  const MakeExchange = async () => {
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
      if (origin && final && amount) {
        const originLower = origin.toLowerCase();
        const finalLower = final.toLowerCase();

        console.log("Valores de origin y final", origin, final);

        const response = await fetch(
          "https://api.qa.vitawallet.io/api/transactions/exchange",
          {
            method: "POST",
            headers: {
              "app-name": "ANGIE",
              "access-token": accessToken,
              uid: uid,
              client: client,
              expiry: expiry,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currency_sent: originLower,
              currency_received: finalLower,
              amount_sent: fromAmountResume,
            }),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          console.log("Error en la solicitud:", data);
        } else {
          console.log("Solicitud exitosa:", data);
        }

        console.log(data);
        console.log("Transacción enviada", originLower, finalLower, amount);
      } else {
        console.log("Falta seleccionar el tipo de transacción");
      }
    } catch (error) {
      console.log("Error al enviar la transacción", error);
    }
  };
  return { MakeExchange };
};

export default Exchange;
