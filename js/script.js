// script.js
import { db } from './app.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("formInscricao");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  try {
    await addDoc(collection(db, "inscricoes"), {
      nome,
      email,
      telefone,
      dataEnvio: new Date()
    });

    alert("Inscrição enviada com sucesso!");
    form.reset();
  } catch (e) {
    alert("Erro ao enviar inscrição: " + e.message);
  }
