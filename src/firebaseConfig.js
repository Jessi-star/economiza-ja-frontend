// Importação do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFRbWmhQuLUIJWoMUXcJbP50MtDQ",
  authDomain: "economiza-ja.firebaseapp.com",
  projectId: "economiza-ja",
  storageBucket: "economiza-ja.firebasestorage.app",
  messagingSenderId: "36089607329",
  appId: "1:36089607329:web:5204097096e3abdb406ce0",
  measurementId: "G-QGRDCTKT9M"
};

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
