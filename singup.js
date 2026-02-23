import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { auth, db } from "./firebase.js";

async function cadastrarUsuario(email, senha, nome, empresa, cargo) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );

    const user = userCredential.user;

    // 🔐 Salva dados no Firestore
    await setDoc(doc(db, "users", user.uid), {
      nome,
      empresa,
      cargo,
      email,
      createdAt: serverTimestamp(),
      emailVerificado: false
    });

    // 📩 Envia e-mail de verificação
    await sendEmailVerification(user);

    console.log("Conta criada. E-mail de verificação enviado.");

  } catch (error) {
    console.error("Erro:", error.message);
  }
}
