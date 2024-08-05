// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdQKY1F5l6hy7_rD74n0nFVAF601BNObw",
  authDomain: "pantrytracker-96fb8.firebaseapp.com",
  projectId: "pantrytracker-96fb8",
  storageBucket: "pantrytracker-96fb8.appspot.com",
  messagingSenderId: "114018590174",
  appId: "1:114018590174:web:76d5b71646c1bde06ad14f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {app, firestore}