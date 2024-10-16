import { createContext, useState, useEffect } from "react";

export const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const [info, setInfo] = useState(null);

  return (
    <InfoContext.Provider value={{ info, setInfo }}>
      {children}
    </InfoContext.Provider>
  );
};
