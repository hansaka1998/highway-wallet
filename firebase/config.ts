import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  doc,
  getFirestore,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTFokFghIWq1veZytgT02QUMER-JtD6VA",
  authDomain: "eei4189.firebaseapp.com",
  projectId: "eei4189",
  storageBucket: "eei4189.firebasestorage.app",
  messagingSenderId: "1094321316553",
  appId: "1:1094321316553:web:6f8e04bf648d6f0f2a2318",
  measurementId: "G-X3XT4FP21T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export කරද්දී මේ නම් ටික හරියටම තියෙන්න ඕනේ
export const db = getFirestore(app);
export const auth = getAuth(app);

export const firebaseService = {
  updateWalletBalance: async (userId: string, newAmount: number) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        balance: increment(newAmount),
        updatedAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating balance:", error);
      return { success: false, error };
    }
  },
};

export default app;
