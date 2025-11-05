import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

 const submit = async (e) => {
  e.preventDefault();
  try {
    await register(nome, email, senha);
    alert("Cadastro realizado ✅");
    navigate("/");
  } catch (err) {
    console.error(err);
    alert("Erro ao cadastrar ❌ " + err.message);
  }
};


  return (
    <div className="flex items-center justify-center" style={{ minHeight: "70vh" }}>
      <form onSubmit={submit} style={{ width: 340, background: "white", padding: 24, borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 16 }}>Cadastro</h2>
        <input placeholder="Seu nome" value={nome} onChange={e=>setNome(e.target.value)} required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <input type="email" placeholder="Seu e-mail" value={email} onChange={e=>setEmail(e.target.value)} required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
        <input type="password" placeholder="Sua senha" value={senha} onChange={e=>setSenha(e.target.value)} required style={{ width: "100%", padding: 10, marginBottom: 16 }} />
        <button type="submit" style={{ width: "100%", padding: 10, background: "#139c43", color: "white", border: "none", borderRadius: 8 }}>
          Criar conta
        </button>
      </form>
    </div>
  );
}
