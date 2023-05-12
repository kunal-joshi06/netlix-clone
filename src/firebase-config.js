// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQWOwRIQAI4a0HAsLMpMoR362uAnesCx8",
  authDomain: "netflix-clone-6c38a.firebaseapp.com",
  projectId: "netflix-clone-6c38a",
  storageBucket: "netflix-clone-6c38a.appspot.com",
  messagingSenderId: "853711299532",
  appId: "1:853711299532:web:5dfd804faa32c69a16b369",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { db, auth };
export default app;
