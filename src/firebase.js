// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN4n-3wp6LLtyGuydFcwPVUlNfifkrP8g",
  authDomain: "dnd-image-gallery-2abcc.firebaseapp.com",
  projectId: "dnd-image-gallery-2abcc",
  storageBucket: "dnd-image-gallery-2abcc.appspot.com",
  messagingSenderId: "327236535795",
  appId: "1:327236535795:web:94f8fae5c7cee1cc2b3e86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
