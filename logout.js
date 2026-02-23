import { auth } from "./firebase.js";
import { signOut } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const btnLogout = document.getElementById("btn-logout");

btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
