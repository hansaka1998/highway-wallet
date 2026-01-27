import { onAuthStateChanged } from "firebase/auth";
import { doc, increment, onSnapshot, updateDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

const WalletContext = createContext<any>(null);

export const WalletProvider = ({ children }: any) => {
  const [balance, setBalance] = useState(0);
  const [creditActive, setCreditActive] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);

        const unsubscribeSnapshot = onSnapshot(
          userRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              // Standardized field name: 'balance'
              const currentBalance = data.balance ?? 0;
              setBalance(Number(currentBalance));
              setCreditActive(data.creditActive ?? false);
              setCreditAmount(data.creditAmount ?? 0);
            }
            setLoading(false);
          },
          (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
          },
        );

        return () => unsubscribeSnapshot();
      } else {
        setBalance(0);
        setCreditActive(false);
        setCreditAmount(0);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Fixed Request credit function
  const requestCredit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      // Syntax Fixed: Included creditAmount inside the update object
      await updateDoc(userRef, {
        balance: increment(1000),
        creditActive: true,
        creditAmount: 1000,
      });
      console.log("Credit of Rs. 1000 activated");
    } catch (error) {
      console.error("Error requesting credit:", error);
    }
  };

  // Deduct amount function for toll payments
  const deductAmount = async (amount: number) => {
    const user = auth.currentUser;
    if (!user) return false;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        balance: increment(-amount),
      });
      return true;
    } catch (error) {
      console.error("Error deducting amount:", error);
      return false;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        loading,
        creditActive,
        creditAmount,
        requestCredit,
        deductAmount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
