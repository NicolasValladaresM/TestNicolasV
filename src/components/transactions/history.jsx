import "./history.css";
import { useContext, useEffect, useState } from "react";
import GetHistorical from "../../services/getHistory";
import { HistoryContext } from "../../context/historicalContext";
import { UserContext } from "../../context/userContext";

const History = () => {
  const { GetHistoryProfile } = GetHistorical();
  const { history = [], setHistory } = useContext(HistoryContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetHistoryProfile();
        setHistory(data);
      } catch (error) {
        setError("No se pudo obtener el historial.", error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <div className="transactions">
      <h1>Historial</h1>

      <div className="container-list">
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul className="list">
            {history.map((item) => {
              const isSent = item.attributes.sender_email === user.email;
              const amountresult = isSent
                ? `-${
                    item.attributes.amount
                  } ${item.attributes.currency.toUpperCase()}`
                : `+${
                    item.attributes.amount
                  } ${item.attributes.currency.toUpperCase()}`;
              const amountClass = isSent
                ? "amountresult negative"
                : "amountresult positive";

              return (
                <li key={item.id} className="list-item">
                  <p className="transaction-type">
                    {isSent ? "Enviaste" : "Recibiste"}
                  </p>
                  <p className={amountClass}>{amountresult}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default History;
