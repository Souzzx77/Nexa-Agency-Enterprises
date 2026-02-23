import { auth, db } from "./firebase.js";
import { doc, setDoc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    setDoc(doc(db, "usuarios", user.uid), {
      email: user.email,
      criadoEm: new Date()
    });
  }
});
