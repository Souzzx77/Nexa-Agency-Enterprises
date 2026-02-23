import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "nexa-enterprises.firebaseapp.com",
  projectId: "nexa-enterprises",
  storageBucket: "nexa-enterprises.firebasestorage.app",
  messagingSenderId: "73095640569",
  appId: "1:73095640569:web:4f19d104b22c931fc0b928"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
