// =========================================
// NEXA ENTERPRISES
// auth.js
// Firebase Authentication
// Parte 1/3
// =========================================


// =========================================
// IMPORTS FIREBASE AUTH
// =========================================

import {

    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


// =========================================
// FIREBASE
// =========================================

import {

    auth,
    db

} from "./firebase.js";


// =========================================
// FIRESTORE
// =========================================

import {

    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";




// =========================================
// ELEMENTOS
// =========================================

const loginForm =
document.getElementById("loginForm");

const googleButton =
document.getElementById("googleLogin");

const logoutBtn =
document.getElementById("logoutBtn");

const message =
document.getElementById("message");




// =========================================
// MENSAGENS
// =========================================

function showMessage(text,type="success"){

    if(!message) return;

    message.textContent=text;

    message.className=`message ${type}`;

}




// =========================================
// SINCRONIZAÇÃO DO USUÁRIO
// =========================================

async function syncUser(user){

    const ref =
    doc(
        db,
        "users",
        user.uid
    );

    const snap =
    await getDoc(ref);




    if(!snap.exists()){

        await setDoc(ref,{

            uid:
            user.uid,

            name:
            user.displayName || "Usuário",

            email:
            user.email || "",

            photo:
            user.photoURL || "",

            company:
            "",

            role:
            "Usuário",

            plan:
            "Free",

            projects:
            0,

            files:
            0,

            messages:
            0,

            notifications:
            0,

            createdAt:
            serverTimestamp(),

            lastLogin:
            serverTimestamp()

        });

    }

    else{

        await updateDoc(ref,{

            name:
            user.displayName || "Usuário",

            email:
            user.email || "",

            photo:
            user.photoURL || "",

            lastLogin:
            serverTimestamp()

        });

    }

}




// =========================================
// LOGIN COM EMAIL
// =========================================

if(loginForm){

loginForm.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    const email=
    document
    .getElementById("email")
    .value
    .trim();

    const password=
    document
    .getElementById("password")
    .value;

    try{

        const credential=
        await signInWithEmailAndPassword(

            auth,
            email,
            password

        );

        await syncUser(
            credential.user
        );

        showMessage(
            "Login realizado com sucesso!",
            "success"
        );

        setTimeout(()=>{

            window.location.replace(
                "inicio.html"
            );

        },800);

    }

    catch(error){

        console.error(error);

        switch(error.code){

            case "auth/invalid-email":

                showMessage(
                    "E-mail inválido.",
                    "error"
                );

            break;

            case "auth/invalid-credential":

            case "auth/user-not-found":

            case "auth/wrong-password":

                showMessage(
                    "E-mail ou senha incorretos.",
                    "error"
                );

            break;

            case "auth/too-many-requests":

                showMessage(
                    "Muitas tentativas. Aguarde alguns minutos.",
                    "error"
                );

            break;

            default:

                showMessage(
                    "Erro ao realizar login.",
                    "error"
                );

        }

    }

});

}

// =========================================
// LOGIN COM GOOGLE
// =========================================

if(googleButton){

googleButton.addEventListener(
"click",
async()=>{

    try{

        const provider =
        new GoogleAuthProvider();

        provider.setCustomParameters({

            prompt:"select_account"

        });

        const result =
        await signInWithPopup(

            auth,
            provider

        );

        await syncUser(
            result.user
        );

        showMessage(

            "Login realizado com sucesso!",
            "success"

        );

        setTimeout(()=>{

            window.location.replace(
                "inicio.html"
            );

        },800);

    }

    catch(error){

        console.error(error);

        switch(error.code){

            case "auth/popup-closed-by-user":

                showMessage(

                    "Login cancelado.",
                    "error"

                );

            break;


            case "auth/popup-blocked":

                showMessage(

                    "O navegador bloqueou a janela do Google.",
                    "error"

                );

            break;


            case "auth/cancelled-popup-request":

                showMessage(

                    "Aguarde alguns segundos e tente novamente.",
                    "error"

                );

            break;


            default:

                showMessage(

                    "Não foi possível entrar com Google.",
                    "error"

                );

        }

    }

});

}



// =========================================
// LOGOUT
// =========================================

if(logoutBtn){

logoutBtn.addEventListener(
"click",
async()=>{

    try{

        await signOut(auth);

        window.location.replace(
            "index.html"
        );

    }

    catch(error){

        console.error(error);

        showMessage(

            "Erro ao sair da conta.",
            "error"

        );

    }

});

}

// =========================================
// PROTEÇÃO DE PÁGINAS
// =========================================

onAuthStateChanged(auth, (user) => {

    const page =
    window.location.pathname
    .split("/")
    .pop();



    // ===========================
    // PÁGINAS PÚBLICAS
    // ===========================

    const publicPages = [

        "",
        "index.html"

    ];



    // ===========================
    // PÁGINAS PROTEGIDAS
    // ===========================

    const protectedPages = [

        "inicio.html",

        "dashboard.html",

        "perfil.html",

        "projetos.html",

        "arquivos.html",

        "notificacoes.html",

        "configuracoes.html",

        "suporte.html",

        "404.html"

    ];



    // ===========================
    // USUÁRIO LOGADO
    // ===========================

    if(user){

        if(publicPages.includes(page)){

            window.location.replace(
                "inicio.html"
            );

        }

        return;

    }



    // ===========================
    // USUÁRIO DESLOGADO
    // ===========================

    if(protectedPages.includes(page)){

        window.location.replace(
            "index.html"
        );

    }

});



// =========================================
// FUNÇÕES GLOBAIS
// =========================================

window.nexa = {

    auth,

    logout: async ()=>{

        try{

            await signOut(auth);

            window.location.replace(
                "index.html"
            );

        }

        catch(error){

            console.error(error);

        }

    }

};



// =========================================
// DEBUG
// =========================================

console.log("==================================");
console.log(" NEXA AUTH INICIALIZADO ");
console.log(" Firebase Authentication OK");
console.log(" Firestore OK");
console.log(" Google Login OK");
console.log(" Proteção de rotas OK");
console.log("==================================");
