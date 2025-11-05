import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPromotion } from "../services/promotionService";


export default function CreatePromotion() {
  const navigate = useNavigate();

  const [supermarkets, setSupermarkets] = useState([]);
  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [validade, setValidade] = useState("");
  const [supermarketId, setSupermarketId] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  useEffect(() => {
    async function fetchSupermarkets() {
      try {
        const res = await axios.get("/supermarkets");
        setSupermarkets(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSupermarkets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPromotion = {
      produto,
      preco: Number(preco),
      validade,
      supermercado: supermarketId,
      imagem: imagemUrl,
    };

    try {
      await createPromotion(newPromotion);
      alert("Promoção cadastrada com sucesso ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar promoção ❌");
    }
  };

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[450px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Cadastrar Promoção 🛒
        </h2>

        <label className="block mb-2 font-semibold">Produto:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Preço:</label>
        <input
          type="number"
          step="0.01"
          className="w-full p-2 border rounded mb-4"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold">Supermercado:</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          placeholder="Ex.: Assaí, Mercadinho Bom Preço"
          value={supermarketId}
          onChange={(e) => setSupermarketId(e.target.value)}
          required
        />


        <label className="block mb-2 font-semibold">Validade:</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={validade}
          onChange={(e) => setValidade(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Imagem (URL):</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-6"
          placeholder="https://exemplo.com/imagem.jpg"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Salvar Promoção ✅
        </button>
      </form>
    </div>
  );
}
