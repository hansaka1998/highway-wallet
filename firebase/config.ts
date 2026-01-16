// Firebase configuration for HiWayPay
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "demo-api-key-for-university-project",
  authDomain: "hiwaypay-demo.firebaseapp.com",
  projectId: "hiwaypay-demo",
  storageBucket: "hiwaypay-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase (mock setup for university project)
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Mock Firebase functions for university project
export const mockFirebase = {
  // Simulate updating wallet balance in Firebase
  updateWalletBalance: async (userId: string, newBalance: number) => {
    console.log(`Mock Firebase: Updating wallet balance for user ${userId} to ${newBalance}`);
    // In a real app, this would update Firestore
    return Promise.resolve({ success: true });
  },

  // Simulate adding transaction to Firebase
  addTransaction: async (userId: string, transaction: any) => {
    console.log(`Mock Firebase: Adding transaction for user ${userId}:`, transaction);
    // In a real app, this would add to Firestore collection
    return Promise.resolve({ success: true, id: Date.now().toString() });
  },

  // Simulate payment processing
  processPayment: async (paymentData: any) => {
    console.log('Mock Firebase: Processing payment:', paymentData);
    // Simulate payment gateway integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `txn_${Date.now()}`,
          status: 'completed'
        });
      }, 2000);
    });
  }
};

export default app;