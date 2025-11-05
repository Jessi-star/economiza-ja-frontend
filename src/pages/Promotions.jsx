import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from "../services/promotionService";

import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Promotions() {
  const { user } = useAuth();
  const [promos, setPromos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [validade, setValidade] = useState("");
  const [supermercadoNome, setSupermercadoNome] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const load = async () => {
    const data = await getPromotions();
    setPromos(data);
  };

  useEffect(() => {
    load();
  }, []);

  const uploadImage = async () => {
    if (!imagemFile) return null;

    const fileName = `${Date.now()}-${imagemFile.name}`;
    const storageRef = ref(storage, `promotions/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, imagemFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const submitPromo = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    if (imagemFile) {
      imageUrl = await uploadImage();
    }

    const newData = {
      produto,
      preco: Number(preco),
      validade,
      supermercado: supermercadoNome,
      imagem: imageUrl,
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
    setImagemFile(null);
    setUploadProgress(0);
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
              cursor: "pointer",
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
            maxWidth: "450px",
            margin: "0 auto 32px",
            padding: 20,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,.1)",
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

          <input
            placeholder="Supermercado"
            value={supermercadoNome}
            onChange={(e) => setSupermercadoNome(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginBottom: 8 }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagemFile(e.target.files[0])}
            style={{ width: "100%", marginBottom: 12 }}
          />

          {uploadProgress > 0 && (
            <p style={{ marginBottom: 12 }}>
              Upload: {uploadProgress}% ⏳
            </p>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                background: "#1e5eff",
                color: "#fff",
                padding: "10px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
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
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {promos.map((p) => (
          <div
            key={p.id}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,.08)",
              overflow: "hidden",
            }}
          >
            {p.imagem ? (
              <img
                src={p.imagem}
                alt={p.produto}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: 180,
                  background: "#f3f3f3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#999",
                }}
              >
                Sem imagem
              </div>
            )}

            <div style={{ padding: 16 }}>
              <h3>{p.produto}</h3>

              <p style={{ fontWeight: 700, color: "#139c43" }}>
                R$ {Number(p.preco).toFixed(2)}
              </p>

              <p>Supermercado: <strong>{p.supermercado}</strong></p>

              <p>Validade: {p.validade}</p>

              {user && (
                <>
                  <button
                    onClick={() => {
                      setEditingId(p.id);
                      setProduto(p.produto);
                      setPreco(p.preco);
                      setValidade(p.validade);
                      setSupermercadoNome(p.supermercado);
                      setImagemFile(null);
                      setUploadProgress(0);
                      setShowForm(true);
                    }}
                    style={{
                      background: "#1e5eff",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: 6,
                      marginTop: 10,
                      marginRight: 8,
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      background: "#d9534f",
                      color: "#fff",
                      padding: "6px 12px",
                      borderRadius: 6,
                      marginTop: 10,
                      cursor: "pointer",
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
