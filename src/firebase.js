// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeMuGnITnv4oD9D4v53P7bmuL8V3itR_g",
  authDomain: "portofolio-464f8.firebaseapp.com",
  projectId: "portofolio-464f8",
  storageBucket: "portofolio-464f8.firebasestorage.app",
  messagingSenderId: "137935826929",
  appId: "1:137935826929:web:43ecb01af6507662271e50",
  measurementId: "G-B2VN32PGV0"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
