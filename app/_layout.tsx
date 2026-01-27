import * as Notifications from "expo-notifications";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import SplashScreen from "../components/SplashScreen";
import { TransactionProvider } from "../contexts/TransactionContext";
import { WalletProvider } from "../contexts/WalletContext";
import { auth, db } from "../firebaseConfig";
import "../global.css";

// ✅ TypeScript Error එක නිවැරදි කරන ලද Notification Handler එක
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true, 
    shouldShowList: true,   
  }),
});

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  // Notification Token එක ලබාගෙන Firestore එකට Save කරන function එක
  async function registerForPushNotifications(userId: string) {
    if (Platform.OS === "web") return;

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") return;

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Token generated:", token);

      // ✅ විසඳුම: updateDoc වෙනුවට setDoc සහ merge: true භාවිතා කිරීම
      // මෙවිට document එක පද්ධතියේ නැතත් අලුතින් සාදා token එක ඇතුළත් කරයි.
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef, 
        { 
          pushToken: token,
          lastUpdated: new Date().toISOString() 
        }, 
        { merge: true }
      );

      console.log("Push token merged successfully!");
    } catch (error) {
      console.log("Error in registerForPushNotifications:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);

      if (user) {
        // ලොග් වූ පසු Token එක update කිරීමට උත්සාහ කරයි
        registerForPushNotifications(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const inAuthFlow = segments[0] === "login" || segments[0] === "signup";

    if (!user && !inAuthFlow) {
      router.replace("/login");
    } else if (user && inAuthFlow) {
      router.replace("/");
    }
  }, [isLoading, user, segments, router]);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <WalletProvider>
      <TransactionProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </TransactionProvider>
    </WalletProvider>
  );
}