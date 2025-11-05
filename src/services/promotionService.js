import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const promoCollection = collection(db, "promocoes");

// ✅ Listar promoções
export async function getPromotions() {
  const snap = await getDocs(promoCollection);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// ✅ Criar promoção
export async function createPromotion(data) {
  await addDoc(promoCollection, data);
}

// ✅ Atualizar promoção
export async function updatePromotion(id, data) {
  const promoRef = doc(db, "promocoes", id);
  await updateDoc(promoRef, data);
}

// ✅ Excluir promoção
export async function deletePromotion(id) {
  const promoRef = doc(db, "promocoes", id);
  await deleteDoc(promoRef);
}
