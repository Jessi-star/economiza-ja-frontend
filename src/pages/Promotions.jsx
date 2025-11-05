import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/promotionService";

import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Promotions() {
  const { user } = useAuth();
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [validade, setValidade] = useState("");
  const [supermercadoNome, setSupermercadoNome] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemUrl, setImagemUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const data = await getPromotions();
    setPromos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadImage = async () => {
    if (!imagemFile) return imagemUrl; // mantém imagem quando editar sem trocar
    const filePath = `promocoes/${Date.now()}-${imagemFile.name}`;
    const storageRef = ref(storage, filePath);
    await uploadBytes(storageRef, imagemFile);
    return await getDownloadURL(storageRef);
  };

  const submitPromo = async (e) => {
    e.preventDefault();

    const uploadedUrl = await uploadImage();

    const newData = {
      produto,
      preco: Number(preco),
      validade,
      supermercado: supermercadoNome,
      imagem: uploadedUrl,
    };

    if (editingId) {
      await updatePromotion(editingId, newData);
      alert("Promoção atualizada ✅");
    } else {
      await createPromotion(newData);
      alert("Promoção cadastrada ✅");
    }

    setProduto("");
    setPreco("");
    setValidade("");
    setSupermercadoNome("");
    setImagemFile(null);
    setImagemUrl("");
    setEditingId(null);
    setShowForm(false);

    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir promoção?")) return;
    await deletePromotion(id);
    load();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Promoções</h1>

      {user && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setProduto("");
              setPreco("");
              setValidade("");
              setSupermercadoNome("");
              setImagemFile(null);
              setImagemUrl("");
            }}
            style={{ background: "#139c43", color: "#fff", padding: "10px 16px", borderRadius: 8 }}
          >
            Nova Promoção
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={submitPromo} style={{ maxWidth: 500, margin: "0 auto" }}>
          <h3>{editingId ? "Editar Promoção" : "Cadastrar Promoção"}</h3>

          <input value={produto} onChange={(e) => setProduto(e.target.value)} placeholder="Produto" required />
          <input value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" required />
          <input type="date" value={validade} onChange={(e) => setValidade(e.target.value)} required />
          <input value={supermercadoNome} onChange={(e) => setSupermercadoNome(e.target.value)} placeholder="Supermercado" required />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagemFile(e.target.files[0])}
            required={!editingId}
          />

          <br />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
        </form>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 300px)", justifyContent: "center", gap: 20 }}>
        {promos.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <img src={p.imagem} alt={p.produto} style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 180 }} />
            <h3>{p.produto}</h3>
            <strong>R$ {p.preco.toFixed(2)}</strong>
            <p>Supermercado: {p.supermercado}</p>
            <p>Validade: {p.validade}</p>

            {user && (
              <>
                <button onClick={() => {
                  setEditingId(p.id);
                  setProduto(p.produto);
                  setPreco(p.preco);
                  setValidade(p.validade);
                  setSupermercadoNome(p.supermercado);
                  setImagemUrl(p.imagem);
                  setShowForm(true);
                }}>Editar</button>

                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8 }}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
