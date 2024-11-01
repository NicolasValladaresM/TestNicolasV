import { createContext, useState, useEffect } from "react";
import { getUserStorage } from "../services/auth";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const saveUser = () => {
    const { user: storedUser } = getUserStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  };

  useEffect(() => {
     saveUser();
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
