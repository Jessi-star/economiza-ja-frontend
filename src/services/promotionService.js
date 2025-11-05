import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const promoCol = collection(db, "promocoes");

export async function getPromotions() {
  const snap = await getDocs(promoCol);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createPromotion(promo) {
  return await addDoc(promoCol, promo);
}

export async function updatePromotion(id, promo) {
  const ref = doc(db, "promocoes", id);
  return await updateDoc(ref, promo);
}

export async function deletePromotion(id) {
  const ref = doc(db, "promocoes", id);
  return await deleteDoc(ref);
}
