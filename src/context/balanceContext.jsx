import { createContext, useState } from "react";

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState("");

  return (
    <BalanceContext.Provider value={{ balance, setBalance, setName, name }}>
      {children}
    </BalanceContext.Provider>
  );
};
