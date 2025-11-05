import { useEffect, useState } from "react";
import {
  getSupermarkets,
  createSupermarket,
  updateSupermarket,
  deleteSupermarket,
} from "../services/supermarketService";
import { useAuth } from "../context/AuthContext";

export default function Supermarkets() {
  const { user } = useAuth();
  const [markets, setMarkets] = useState([]);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const data = await getSupermarkets();
    setMarkets(data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();

    const s = { nome, endereco };

    if (editingId) {
      await updateSupermarket(editingId, s);
      alert("Supermercado atualizado ✅");
    } else {
      await createSupermarket(s);
      alert("Supermercado cadastrado ✅");
    }

    setNome("");
    setEndereco("");
    setEditingId(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir supermercado?")) return;
    await deleteSupermarket(id);
    await load();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Supermercados</h2>

      {user && (
        <form onSubmit={submit}>
          <input
            placeholder="Nome do Supermercado"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <input
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <button style={{
            background: "#139c43",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "none"
          }}>
            {editingId ? "Salvar" : "Cadastrar"}
          </button>
        </form>
      )}

      <ul style={{ marginTop: 20 }}>
        {markets.map((m) => (
          <li key={m.id} style={{
            background: "#fff",
            marginBottom: 10,
            padding: 12,
            borderRadius: 8,
            boxShadow: "0 2px 6px rgba(0,0,0,.1)"
          }}>
            <strong>{m.nome}</strong> <br />
            <span style={{ fontSize: 14 }}>{m.endereco}</span>

            {user && (
              <div style={{ marginTop: 8 }}>
                <button
                  onClick={() => {
                    setEditingId(m.id);
                    setNome(m.nome);
                    setEndereco(m.endereco);
                  }}
                  style={{
                    background: "#1e5eff",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "none",
                    marginRight: 6
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
                  style={{
                    background: "#d9534f",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: "none"
                  }}
                >
                  Excluir
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
