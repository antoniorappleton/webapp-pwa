import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmZpIVsyPnL-piK7m5k1pa6mvEzM75SDU",
  authDomain: "webapp02-c97dc.firebaseapp.com",
  projectId: "webapp02-c97dc",
  storageBucket: "webapp02-c97dc.firebasestorage.app",
  messagingSenderId: "131248996200",
  appId: "1:131248996200:web:49684ac975207c633860dd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };