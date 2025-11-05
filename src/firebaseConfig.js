// src/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFRbWmhuQLUJPxoJJlWoMUXCJbP5OMtDQ",
  authDomain: "economiza-ja.firebaseapp.com",
  projectId: "economiza-ja",
  storageBucket: "economiza-ja.firebasestorage.app",
  messagingSenderId: "36089607329",
  appId: "1:36089607329:web:5204097069e3abdb406ce0",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
