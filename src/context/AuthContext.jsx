import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { app } from "../firebaseConfig";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, [auth]);

  const register = async (nome, email, senha) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(userCredential.user, { displayName: nome });
  };

  const login = async (email, senha) =>
    await signInWithEmailAndPassword(auth, email, senha);

  const logout = async () => await signOut(auth);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
