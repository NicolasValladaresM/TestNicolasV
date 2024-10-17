import { createContext, useState, useEffect } from "react";

export const TransContext = createContext();

export const TransProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);
  const [final, setFinal] = useState(null);
  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [fromAmountResume, setFromAmountResume] = useState(null);
  const [toAmountResume, setToAmountResume] = useState(null);



  return (
    <TransContext.Provider
      value={{
        origin,
        setOrigin,
        final,
        setFinal,
        amount,
        setAmount,
        setRate,
        rate,
        setFromAmountResume,
        fromAmountResume,
        setToAmountResume,
        toAmountResume,

      }}
    >
      {children}
    </TransContext.Provider>
  );
};
