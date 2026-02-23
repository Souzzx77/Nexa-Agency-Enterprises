import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    console.log("Usuário:", data);

    // exemplo de uso
    document.getElementById("userName").innerText = data.nome;
    document.getElementById("company").innerText = data.empresa;
    document.getElementById("role").innerText = data.cargo;
  } else {
    console.error("Perfil não encontrado no Firestore");
  }
});
