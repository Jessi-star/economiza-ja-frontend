import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    const { data } = await api.post("/api/auth/login", { email, senha });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const register = async (nome, email, senha) => {
    const { data } = await api.post("/api/auth/register", { nome, email, senha });
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/api/auth/profile");
      if (data?._id) setUser({ id: data._id, nome: data.nome, email: data.email });
    } catch {
      // sem sessão
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
