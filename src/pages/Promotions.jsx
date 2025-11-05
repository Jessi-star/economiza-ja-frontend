import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/promotionService";

export default function Promotions() {
  const { user } = useAuth();
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [validade, setValidade] = useState("");
  const [supermercadoNome, setSupermercadoNome] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const data = await getPromotions();
    setPromos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submitPromo = async (e) => {
    e.preventDefault();

    const newData = {
      produto,
      preco: Number(preco),
      validade,
      supermercado: supermercadoNome,
      imagem: imagemUrl,
    };

    if (editingId) {
      await updatePromotion(editingId, newData);
      alert("Promoção atualizada ✅");
    } else {
      await createPromotion(newData);
      alert("Promoção cadastrada ✅");
    }

    setEditingId(null);
    setProduto("");
    setPreco("");
    setValidade("");
    setSupermercadoNome("");
    setImagemUrl("");
    setShowForm(false);

    await load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir promoção?")) return;
    await deletePromotion(id);
    await load();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Promoções</h1>

      {user && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
            }}
            style={{
              background: "#139c43",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 8,
            }}
          >
            Nova Promoção
          </button>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={submitPromo}
          style={{
            maxWidth: 540,
            margin: "0 auto 24px",
            padding: 16,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(0,0,0,.08)",
          }}
        >
          <h3 style={{ marginBottom: 12 }}>
            {editingId ? "Editar Promoção" : "Cadastrar Promoção"}
          </h3>

          <input placeholder="Produto"
            value={produto} onChange={(e) => setProduto(e.target.value)}
            required style={{ width: "100%", padding: 10, marginBottom: 8 }} />

          <input placeholder="Preço (ex: 18.99)"
            value={preco} onChange={(e) => setPreco(e.target.value)}
            required style={{ width: "100%", padding: 10, marginBottom: 8 }} />

          <input type="date"
            value={validade} onChange={(e) => setValidade(e.target.value)}
            required style={{ width: "100%", padding: 10, marginBottom: 8 }} />

          <input placeholder="Supermercado"
            value={supermercadoNome} onChange={(e) => setSupermercadoNome(e.target.value)}
            required style={{ width: "100%", padding: 10, marginBottom: 8 }} />

          <input placeholder="Imagem (URL)"
            value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 12 }} />

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit"
              style={{
                background: "#1e5eff",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: 8
              }}>
              Salvar
            </button>
            <button type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: "#777",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: 8
              }}>
              Cancelar
            </button>
          </div>
        </form>
      )}

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
              overflow: "hidden"
            }}>
            
            <img src={p.imagem}
              alt={p.produto}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover"
              }} />

            <div style={{ padding: 16 }}>
              <h3>{p.produto}</h3>
              <div style={{ color: "#139c43", fontWeight: 700 }}>
                R$ {Number(p.preco).toFixed(2)}
              </div>

              <p>
                Supermercado: <strong>{p.supermercado}</strong>
              </p>

              {p.validade && (
                <p style={{ color: "#555" }}>Validade: {p.validade}</p>
              )}

              {user && (
                <>
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setEditingId(p.id);
                      setProduto(p.produto);
                      setPreco(p.preco);
                      setValidade(p.validade || "");
                      setSupermercadoNome(p.supermercado);
                      setImagemUrl(p.imagem || "");
                    }}
                    style={{
                      background: "#1e5eff",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: 6,
                      marginTop: 10,
                      marginRight: 10
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: "#d9534f",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: 6,
                      marginTop: 10
                    }}
                  >
                    Excluir
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
