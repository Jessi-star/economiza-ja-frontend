import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      alert("Login realizado com sucesso ✅");
      navigate("/");
    } catch (err) {
      alert("Erro ao fazer login ❌");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center" style={{ minHeight: "70vh" }}>
      <form onSubmit={submit} style={{ width: 320, background: "white", padding: 24, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Login</h2>
        <input type="email" placeholder="Digite seu e-mail" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full p-2 border rounded" style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <input type="password" placeholder="Digite sua senha" value={senha} onChange={e=>setSenha(e.target.value)} required className="w-full p-2 border rounded" style={{ width: "100%", padding: 10, marginBottom: 16 }} />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#1e5eff", color: "white", border: "none", borderRadius: 8 }}>Entrar</button>
        <div style={{ marginTop: 12, textAlign: "center" }}>
          <Link to="/register">Não tem conta? Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}
