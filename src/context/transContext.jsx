import { createContext, useState, useEffect } from "react";

export const TransContext = createContext();

export const TransProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null);
  const [final, setFinal] = useState(null);
  const [amount, setAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [fromAmountResume, setFromAmountResume] = useState(null);

  useEffect(() => {
    console.log('origin:', origin, 'final:', final, 'amount:', amount, 'Desde contexto Transconstext');
  }, [origin, final, amount]);
  

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
      }}
    >
      {children}
    </TransContext.Provider>
  );
};
