// src/services/promotionService.js

import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

// ✅ Usar sempre o mesmo nome da coleção
const COLLECTION_NAME = "promotions";

// ✅ Buscar promoções com ID correto
export async function getPromotions() {
  const snap = await getDocs(collection(db, COLLECTION_NAME));
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

// ✅ Criar promoção
export async function createPromotion(promotion) {
  await addDoc(collection(db, COLLECTION_NAME), promotion);
 }
