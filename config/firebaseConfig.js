// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-clone-e08d6.firebaseapp.com",
  projectId: "loop-clone-e08d6",
  storageBucket: "loop-clone-e08d6.appspot.com",
  messagingSenderId: "733123744410",
  appId: "1:733123744410:web:acebae4dccc9d032c94523",
  measurementId: "G-WDL7X3YKGH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);