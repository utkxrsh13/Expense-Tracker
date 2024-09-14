// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmjVd8Iwa49xWmwcdJhPgbuHVN2DpqCro",
  authDomain: "finance-app-b3b90.firebaseapp.com",
  projectId: "finance-app-b3b90",
  storageBucket: "finance-app-b3b90.appspot.com",
  messagingSenderId: "678556530896",
  appId: "1:678556530896:web:0d733c731622736cf746d5",
  measurementId: "G-EG7FZT87KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };