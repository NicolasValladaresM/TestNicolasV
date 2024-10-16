import "./balance.css";
import { useEffect } from "react";
import { useContext } from "react";
import { BalanceContext } from "../../context/balanceContext";
import GetBalance from "../../services/getBalance";
import dollar from "../../assets/usdc.svg";
import usdt from "../../assets/tether.svg";
import btc from "../../assets/btc.svg";

const Balance = () => {
  const { setBalance, balance } = useContext(BalanceContext);
  const { GetBalancesData } = GetBalance();

  useEffect(() => {
    const fetchProfileBalances = async () => {
      const data = await GetBalancesData();
      setBalance(data.balances);
      console.log("Los balances son ", data);
    };
    fetchProfileBalances();
  }, []);

  return (
    <div className="card-container">
      <div className="card">
        <div className="with-icon">
          <p className="type-balance">Dolares </p>
          <img src={dollar} alt="dolar" width="24" height="24"/>
        </div>
        <p className="valores">{balance?.usd ?? "Cargando..."}</p>
      </div>
      <div className="card">
        <div className="with-icon">
        
          <p className="type-balance">Bitcoin </p>
          <img src={btc} alt="btc" width="24" height="24" />
        </div>
        <p className="valores">{balance?.btc ?? "Cargando..."}</p>
      </div>
      <div className="card">
        <div className="with-icon">
          <p className="type-balance">Tether </p>
          <img src={usdt} alt="usdt" width="24" height="24" />
        </div>
        <p className="valores">{balance?.usdt ?? "Cargando..."}</p>
        </div>
    </div>
  );
};

export default Balance;
