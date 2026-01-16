import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import LoginScreen from "../components/LoginScreen";
import SplashScreen from "../components/SplashScreen";
import { TransactionProvider } from "../contexts/TransactionContext";
import { WalletProvider } from "../contexts/WalletContext";
import { auth } from "../firebaseConfig";
import "../global.css";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <WalletProvider>
      <TransactionProvider>
        <Stack />
      </TransactionProvider>
    </WalletProvider>
  );
}
