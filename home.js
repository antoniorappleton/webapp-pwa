// home.js
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./firebaseConfig.js"; // Ajusta o path se necessário
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

// Verifica se o utilizador está autenticado
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      document.getElementById("labelNome").textContent =
        docSnap.data().nome || "-";
      document.getElementById("labelIdade").textContent =
        docSnap.data().idade || "-";
    }
  } else {
    // Se não estiver autenticado, redireciona para o login
    window.location.href = "index.html";
  }
});

// Guardar os dados
document.getElementById("guardarBtn").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    await setDoc(doc(db, "users", uid), {
      nome,
      idade,
    });
    document.getElementById("labelNome").textContent = nome;
    document.getElementById("labelIdade").textContent = idade;
  }
});

// Logout
/*document.getElementById("logoutBtn").addEventListener("click", () => {
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
    });
    

const logoutBtn = document.getElementById("logoutBtn");*/

logoutBtn.addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("Sessão terminada");
      // Apagar campos (opcional)
      localStorage.clear(); // se usares localStorage
      sessionStorage.clear(); // se usares sessionStorage
      // Redirecionar para index.html
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erro ao terminar sessão:", error);
    });
});
/*});*/
