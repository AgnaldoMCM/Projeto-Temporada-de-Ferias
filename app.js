// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGC0VltsvXlq5V_5jKoaX5X-NLE7mXNuQ",
  authDomain: "temporada-de-ferias.firebaseapp.com",
  projectId: "temporada-de-ferias",
  storageBucket: "temporada-de-ferias.firebasestorage.app",
  messagingSenderId: "73454276212",
  appId: "1:73454276212:web:5c765bafb0926b8f564b21",
  measurementId: "G-CE7S976N2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
