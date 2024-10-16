import { createContext, useState } from "react";

export const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
  const [usd, setUSD] = useState(null);
  const [usdt, setUSDT] = useState(null);
  const [btc, setBTC] = useState(null);

  return (
    <PricesContext.Provider value={{ usd, setUSD, usdt, setUSDT, btc, setBTC }}>
      {children}
    </PricesContext.Provider>
  );
};
