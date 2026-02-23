import { getAuth, confirmPasswordReset } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();
const btn = document.getElementById("btn-save");

const params = new URLSearchParams(window.location.search);
const oobCode = params.get("oobCode");

btn.addEventListener("click", () => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!password || !confirmPassword) {
    alert("Preencha todos os campos.");
    return;
  }

  if (password.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    alert("As senhas não coincidem.");
    return;
  }

  confirmPasswordReset(auth, oobCode, password)
    .then(() => {
      alert("Senha redefinida com sucesso!");
      window.location.href = "login.html";
    })
    .catch(() => {
      alert("Link inválido ou expirado.");
    });
});
