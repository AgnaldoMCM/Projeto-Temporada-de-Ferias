import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGC0VltsvXlq5V_5jKoaX5X-NLE7mXNuQ",
  authDomain: "temporada-de-ferias.firebaseapp.com",
  projectId: "temporada-de-ferias",
  storageBucket: "temporada-de-ferias.appspot.com",
  messagingSenderId: "73454276212",
  appId: "1:73454276212:web:5c765bafb0926b8f564b21",
  measurementId: "G-CE7S976N2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('inscricao-form');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    nome: form.nome.value.trim(),
    idade: parseInt(form.idade.value),
    telefone: form.telefone.value.trim(),
    email: form.email.value.trim(),
    local: form.local.value.trim(),
    alergias: form.alergias.value.trim(),
  };

  try {
    // Envia para Firebase Firestore
    await addDoc(collection(db, "inscricoes"), {
      ...dados,
      timestamp: serverTimestamp(),
    });

    // Envia para Google Sheets via webhook
    const response = await fetch("https://script.google.com/macros/s/AKfycbzVQK9392xdvNyFR1SHv-alv7x220cDzP3C1FWAr576IUKgURC_23UsT7CXgfWiqwx1/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) throw new Error("Erro ao enviar para o Google Sheets");

    messageDiv.textContent = "Inscrição enviada com sucesso! 🙌";
    messageDiv.style.color = "#a0ffa0";
    form.reset();

  } catch (error) {
    messageDiv.textContent = "Erro ao enviar inscrição: " + error.message;
    messageDiv.style.color = "#ff9999";
  }
});

