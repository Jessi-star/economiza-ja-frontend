import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/promotionService";
import { getSupermarkets } from "../services/supermarketService";

export default function Promotions() {
  const { user } = useAuth();

  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [validade, setValidade] = useState("");
  const [supermercadoNome, setSupermercadoNome] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [supermarkets, setSupermarkets] = useState([]);

  // ✅ Carregar lista de promoções
  const load = async () => {
    const data = await getPromotions();
    setPromos(data);
  };

  // ✅ Carregar lista de supermercados
  const loadSupermarkets = async () => {
    const data = await getSupermarkets();
    setSupermarkets(data);
  };

  useEffect(() => {
    load();
    loadSupermarkets(); // ✅ necessário para preencher o select
  }, []);

  const submitPromo = async (e) => {
    e.preventDefault();

    const newData = {
      produto,
      preco: Number(preco),
      validade,
      supermercado: supermercadoNome,
    };

    if (editingId) {
      await updatePromotion(editingId, newData);
      alert("Promoção atualizada ✅");
    } else {
      await createPromotion(newData);
      alert("Promoção cadastrada ✅");
    }

    resetForm();
    await load();
  };

  const resetForm = () => {
    setEditingId(null);
    setProduto("");
    setPreco("");
    setValidade("");
    setSupermercadoNome("");
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir promoção?")) return;
    await deletePromotion(id);
    await load();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Promoções</h1>

      {/* ✅ Mensagem para usuários deslogados */}
      {!user && (
        <div
          style={{
            background: "#ffcc00",
            padding: "20px",
            borderRadius: "12px",
            color: "#000",
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            marginBottom: "24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        >
          Faça login para ver as promoções 🔐
        </div>
      )}

      {/* ✅ Botão só aparece para logados */}
      {user && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            onClick={() => resetForm() || setShowForm(true)}
            style={{
              background: "#139c43",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Nova Promoção
          </button>
        </div>
      )}

      {/* ✅ Formulário */}
      {showForm && user && (
        <form
          onSubmit={submitPromo}
          style={{
            maxWidth: 450,
            margin: "0 auto 32px",
            padding: 20,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,.1)"
          }}
        >
          <h3 style={{ marginBottom: 12 }}>
            {editingId ? "Editar Promoção" : "Cadastrar Promoção"}
          </h3>

          <input
            placeholder="Produto"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          <input
            placeholder="Preço (Ex: 9.99)"
            type="number"
            step="0.01"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          <input
            type="date"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          {/* ✅ Select com supermercados cadastrados */}
          <select
            value={supermercadoNome}
            onChange={(e) => setSupermercadoNome(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          >
            <option value="">Selecione um Supermercado</option>
            {supermarkets.map((s) => (
              <option key={s.id} value={s.nome}>
                {s.nome} - {s.endereco}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                background: "#1e5eff",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer"
              }}
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#777",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer"
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* ✅ Lista de promoções */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 20
      }}>
        {promos.map((p) => (
          <div key={p.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,.08)",
              padding: 16
            }}>

            <h3>{p.produto}</h3>
            <p style={{ color: "#139c43", fontWeight: 700 }}>
              R$ {Number(p.preco).toFixed(2)}
            </p>

            <p>Supermercado: <strong>{p.supermercado}</strong></p>

            <p style={{ color: "#555" }}>Validade: {p.validade}</p>

            {user && (
              <>
                <button
                  onClick={() => {
                    setEditingId(p.id);
                    setProduto(p.produto);
                    setPreco(p.preco);
                    setValidade(p.validade);
                    setSupermercadoNome(p.supermercado);
                    setShowForm(true);
                  }}
                  style={{
                    background: "#1e5eff",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: 6,
                    marginTop: 10,
                    marginRight: 10,
                    cursor: "pointer"
                  }}
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    background: "#e63946",
                    color: "#fff",
                    padding: "6px 10px",
                    borderRadius: 6,
                    marginTop: 10,
                    cursor: "pointer"
                  }}
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
