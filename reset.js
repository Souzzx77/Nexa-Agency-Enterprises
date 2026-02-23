import { auth } from "./firebase.js";
import { sendPasswordResetEmail } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const btnReset = document.getElementById("btn-reset");

btnReset.addEventListener("click", () => {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Informe seu e-mail.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Link de redefinição enviado para seu e-mail.");
    })
    .catch((error) => {
      alert("Erro ao enviar o e-mail. Verifique se o endereço está correto.");
      console.error(error);
    });
});
