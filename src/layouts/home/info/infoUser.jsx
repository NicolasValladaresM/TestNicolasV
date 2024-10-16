import { useContext, useEffect, useState } from "react";
import Balance from "../../../components/cardbalance/balance";
import History from "../../../components/transactions/history";
import GetBalance from "../../../services/getBalance";
import coin from "/coin.png";
import "./infoUser.css";

const InfoUser = () => {
  const { GetBalancesData } = GetBalance();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const data = await GetBalancesData();
      setName(data.first_name);
      console.log("El name es  ", name);
    };
    fetchName();
  }, []);

  return (
    <div className="info">
      <div className="header">
        <img src={coin} alt="coin" className="coin" />
        <p className="welcome">
          <span className="hola">¡Hola </span>
          <span className="name">{name}!</span>
        </p>
      </div>

      <div className="subtitle-container">
        <h1 className="subtitle">Mis Saldos</h1>
      </div>
      <div className="info-balance">
        <Balance />
      </div>

      <div className="history-container">
        <History />
      </div>
    </div>
  );
};

export default InfoUser;
