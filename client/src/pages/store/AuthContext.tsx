import { createContext, useContext, useState, ReactNode } from "react";

interface UserAuthContextType {
  getUser: () => {};
  login: (
    user: { id: string; name: string; email: string; role: string },
    token: string
  ) => void;
  logout: () => void;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return null;
  };
  const login = (
    user: { id: string; name: string; role: string; email: string },
    token: string
  ) => {
    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <UserAuthContext.Provider value={{ login, logout, getUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};
