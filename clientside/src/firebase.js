import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sadiq-estate.firebaseapp.com",
  projectId: "sadiq-estate",
  storageBucket: "sadiq-estate.appspot.com",
  messagingSenderId: "74818868917",
  appId: "1:74818868917:web:e2a09c8ab014d4f0a790fc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
