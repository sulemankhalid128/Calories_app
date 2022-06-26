import { createContext, useState } from "react";

export const AppContext = createContext({
  user: null,
});

/**
 * Context Provider
 * @param props
 */
const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const setContextUser = (user) => setUser(user);

  return (
    <AppContext.Provider
      value={{
        user,
        setContextUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
