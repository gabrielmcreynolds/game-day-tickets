import React, { createContext, useEffect, useState } from "react";
import User from "../types/user";
import { getAccount } from "../utils/api/account";

const UserContext = createContext<{
  user: User | undefined;
  setUser: (u: User | undefined) => void;
  loading: boolean;
}>({
  user: undefined,
  setUser: () => {},
  loading: true,
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async (): Promise<void> => {
      const u = await getAccount();
      setUser(u);
      setLoading(false);
    };
    fetchAccount();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserContext;
