import { db } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const promotionCollection = collection(db, "promotions");

// Listar promoções
export const getPromotions = async () => {
  const response = await getDocs(promotionCollection);
  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Cadastrar promoção
export const createPromotion = async (promotion) => {
  await addDoc(promotionCollection, promotion);
};

// Atualizar promoção
export const updatePromotion = async (id, promotion) => {
  const promoRef = doc(db, "promotions", id);
  await updateDoc(promoRef, promotion);
};

// Deletar promoção
export const deletePromotion = async (id) => {
  const promoRef = doc(db, "promotions", id);
  await deleteDoc(promoRef);
};
