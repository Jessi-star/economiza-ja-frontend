import { db, storage } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const collectionRef = collection(db, "promocoes");

export async function uploadImage(file) {
  const imageRef = ref(storage, `promotions/${file.name}-${Date.now()}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

export async function getPromotions() {
  const snap = await getDocs(collectionRef);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createPromotion(data) {
  return await addDoc(collectionRef, data);
}

export async function updatePromotion(id, data) {
  return await updateDoc(doc(collectionRef, id), data);
}

export async function deletePromotion(id) {
  return await deleteDoc(doc(collectionRef, id));
}
