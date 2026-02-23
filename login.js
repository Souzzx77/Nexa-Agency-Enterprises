import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase.js";

async function cadastrarUsuario(email, senha, nome, empresa, cargo) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      nome: nome,
      empresa: empresa,
      cargo: cargo,
      email: email,
      createdAt: serverTimestamp()
    });

    console.log("Usuário criado e salvo no Firestore.");
  } catch (error) {
    console.error("Erro:", error.message);
  }
}
