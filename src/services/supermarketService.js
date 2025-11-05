import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

const COLLECTION = "supermarkets";

// ✅ Buscar supermercados
export async function getSupermarkets() {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ✅ Criar supermercado
export async function createSupermarket(data) {
  await addDoc(collection(db, COLLECTION), data);
}

// ✅ Editar supermercado
export async function updateSupermarket(id, data) {
  await updateDoc(doc(db, COLLECTION, id), data);
}

// ✅ Excluir supermercado
export async function deleteSupermarket(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}
