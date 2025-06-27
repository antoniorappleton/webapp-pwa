import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let userDocId = null; // para guardar o ID do documento do utilizador

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Utilizador não autenticado.");
    window.location.href = "index.html";
    return;
  }

  // Procura documento do utilizador
  const q = query(collection(db, "registos"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();

    userDocId = docSnap.id; // Guardar o ID do documento

    document.getElementById("labelNome").textContent = data.nome;
    document.getElementById("labelIdade").textContent = data.idade;
    document.getElementById("nome").value = data.nome;
    document.getElementById("idade").value = data.idade;
  }

  document.getElementById("guardarBtn").addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const idade = Number(document.getElementById("idade").value);

    const dados = {
      uid: user.uid,
      email: user.email,
      nome: nome,
      idade: idade,
      timestamp: new Date()
    };

    try {
      if (userDocId) {
        // Atualizar documento existente
        const ref = doc(db, "registos", userDocId);
        await updateDoc(ref, dados);
        alert("Registo atualizado!");
      } else {
        // Criar novo documento se ainda não existir
        const ref = doc(collection(db, "registos"));
        await setDoc(ref, dados);
        userDocId = ref.id; // guarda o novo ID
        alert("Novo registo criado!");
      }

      // Atualiza os dados visíveis
      document.getElementById("labelNome").textContent = nome;
      document.getElementById("labelIdade").textContent = idade;
    } catch (e) {
      alert("Erro ao guardar: " + e.message);
    }
  });
});