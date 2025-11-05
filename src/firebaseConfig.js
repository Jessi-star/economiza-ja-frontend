import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "economiza-ja.firebaseapp.com",
  projectId: "economiza-ja",
  storageBucket: "economiza-ja.appspot.com",
  messagingSenderId: "36089607329",
  appId: "1:36089607329:web:5204097069e3abdb406ce0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
