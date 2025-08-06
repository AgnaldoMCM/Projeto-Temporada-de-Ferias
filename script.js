import { db } from './app.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("inscricao-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const local = document.getElementById("local").value;
  const alergia = document.getElementById("Alergia").value;

  try {
    await addDoc(collection(db, "inscricoes"), {
      nome,
      idade: Number(idade),
      telefone,
      email,
      local,
      alergia,
      dataEnvio: new Date()
    });

    document.getElementById("message").innerText = "✅ Inscrição enviada com sucesso!";
    form.reset();
  } catch (e) {
    document.getElementById("message").innerText = "❌ Erro ao enviar inscrição: " + e.message;
  }
});
