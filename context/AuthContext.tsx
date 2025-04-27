"use client";

import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  // setUser: React.Dispatch<React.SetStateAction<string | null>>;
  // username: string;
  // setUsername: React.Dispatch<React.SetStateAction<string>>;
  // password: string;
  // setPassword: React.Dispatch<React.SetStateAction<string>>;
  // isAuthenticated: boolean;
  // setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
    

//     const isAuthenticated = () => {
//         if (user != null) return true;
//         else return false;
// }
   

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        // username,
        // setUsername,
        // password,
        // setPassword,
        // isAuthenticated,
        // setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
