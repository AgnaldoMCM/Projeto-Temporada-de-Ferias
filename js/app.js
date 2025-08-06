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
  measurementId: "G-CE7S976N2J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("inscricao-form");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value;
  const idade = form.idade.value;
  const telefone = form.telefone.value;
  const email = form.email.value;
  const local = form.local.value;
  const alergia = form.Alergia.value;

  try {
    await addDoc(collection(db, "inscricoes"), {
      nome,
      idade,
      telefone,
      email,
      local,
      alergia,
      timestamp: new Date()
    });

    messageDiv.textContent = "✅ Inscrição enviada com sucesso!";
    messageDiv.style.color = "#a0ffa0";
    form.reset();
  } catch (error) {
    console.error("Erro ao enviar:", error);
    messageDiv.textContent = "❌ Erro ao enviar inscrição. Tente novamente.";
    messageDiv.style.color = "#ffaaaa";
  }
});

