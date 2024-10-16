import { createContext, useState } from "react";

export const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirm, setConfirm] = useState(null);

  return (
    <ConfirmContext.Provider value={{ confirm, setConfirm }}>
      {children}
    </ConfirmContext.Provider>
  );
};
