// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4UDRzVEWETdDvX1aT0F-v5WBVIJnBcOQ",
  authDomain: "exercicefirebase-5b3dc.firebaseapp.com",
  projectId: "exercicefirebase-5b3dc",
  storageBucket: "exercicefirebase-5b3dc.appspot.com",
  messagingSenderId: "286574722900",
  appId: "1:286574722900:web:ad01bb0b37474bae1ed2c1",
  databaseUrl:"https://exercicefirebase-5b3dc-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export const BASE_DB_URLv= firebaseConfig.databaseUrl;
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`

