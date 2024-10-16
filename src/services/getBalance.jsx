const GetBalance = () => {
  const GetBalancesData = async () => {
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
      return data.data.attributes;
    } catch (error) {
      console.log("Error al obtener balances del usuario", error);
    }
  };
  return { GetBalancesData };
};

export default GetBalance;
