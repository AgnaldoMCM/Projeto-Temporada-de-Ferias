// js/app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGC0VltsvXlq5V_5jKoaX5X-NLE7mXNuQ",
  authDomain: "temporada-de-ferias.firebaseapp.com",
  projectId: "temporada-de-ferias",
  storageBucket: "temporada-de-ferias.firebasestorage.app",
  messagingSenderId: "73454276212",
  appId: "1:73454276212:web:5c765bafb0926b8f564b21",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("inscricao-form");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nome: form.nome.value,
    idade: form.idade.value,
    telefone: form.telefone.value,
    email: form.email.value,
    local: form.local.value,
    alergia: form.Alergia.value,
    timestamp: new Date().toISOString()
  };

  try {
    // Firebase Firestore
    await addDoc(collection(db, "inscricoes"), data);

    // Google Sheets (via Web App)
    await fetch("https://script.google.com/macros/s/AKfycbzVQK9392xdvNyFR1SHv-alv7x220cDzP3C1FWAr576IUKgURC_23UsT7CXgfWiqwx1/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    messageDiv.textContent = "Inscrição enviada com sucesso!";
    form.reset();
  } catch (err) {
    console.error("Erro ao enviar:", err);
    messageDiv.textContent = "Ocorreu um erro. Tente novamente.";
  }
});

