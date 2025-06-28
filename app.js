import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Registado com sucesso!"))
    .catch(error => alert(error.message));
});

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login feito!");
      window.location.href = "home.html";
    })
    .catch(error => alert(error.message));
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Limpa os dados locais (opcional)
      localStorage.clear();
      sessionStorage.clear();

      // Redireciona para o ecrã inicial
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erro ao fazer logout:", error);
    });;
 });
