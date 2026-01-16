import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration from console
const firebaseConfig = {
  apiKey: "AIzaSyCTFokFghIWq1veZytgT02QUMER-JtD6VA",
  authDomain: "eei4189.firebaseapp.com",
  projectId: "eei4189",
  storageBucket: "eei4189.firebasestorage.app",
  messagingSenderId: "1094321316553",
  appId: "1:1094321316553:web:6f8e04bf648d6f0f2a2318",
  measurementId: "G-X3XT4FP21T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services for HiWayPay features
export const auth = getAuth(app); // For Email/OTP Auth 
export const db = getFirestore(app); // For Transaction Logs & Wallet Balance

export default app;