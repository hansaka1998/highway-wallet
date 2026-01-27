import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { useWallet } from "../contexts/WalletContext"; // Make sure this path is correct
import { auth, db } from "../firebaseConfig";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

// Enhanced Gradient Card to match the screenshot's thicker/brighter borders
function GradientPillCard({
  children,
  className = "",
  innerClassName = "",
  borderRadius = 35,
  padding = 2,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  borderRadius?: number;
  padding?: number;
}) {
  return (
    <LinearGradient
      colors={["#FF4133", "#7A003C", "#FF4133"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ borderRadius, padding }}
      className={className}
    >
      <View
        style={{ borderRadius: borderRadius - 2 }}
        className={`bg-[#0F0F12] ${innerClassName}`}
      >
        {children}
      </View>
    </LinearGradient>
  );
}

const Index = () => {
  const { balance, creditActive, creditAmount, requestCredit } = useWallet();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setProfileImage(data.profileImage || DEFAULT_AVATAR);
      }
    });

    return () => unsub();
  }, []);

  const handleTopUp = () => {
    router.push("/topup");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-[#0b0b0f]">
        {/* Background Glow */}
        <View className="absolute inset-0">
          <Svg width="100%" height="100%">
            <Defs>
              <RadialGradient id="bgGlow" cx="50%" cy="30%" r="60%">
                <Stop offset="0%" stopColor="#4D0026" stopOpacity="0.6" />
                <Stop offset="100%" stopColor="#0b0b0f" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#bgGlow)" />
          </Svg>
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-14">
          <View className="h-12 w-12" />
          <Text className="flex-1 text-center text-xl font-bold tracking-[4px] text-white">
            HIGHWAY PAY
          </Text>
          <Pressable
            onPress={() => router.push("/profile")}
            className="h-12 w-12 overflow-hidden rounded-full border-2 border-white/20"
          >
            <Image source={{ uri: profileImage }} className="h-full w-full" />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-8 pb-40"
        >
          {/* Wallet Balance Card */}
          <GradientPillCard className="mb-8" innerClassName="px-8 py-7">
            <Text className="text-xs font-bold tracking-widest text-white/60">
              WALLET BALANCE
            </Text>
            <Text className="mb-3 mt-2 text-5xl font-black text-white">
              RS. {balance.toFixed(2)}
            </Text>
            {creditActive ? (
              <View>
                <Text className="text-sm text-red-400/80">
                  • Micro-credit active: Rs. {creditAmount.toFixed(2)} owed
                </Text>
                <Text className="mt-1 text-xs text-white/50">
                  Top-up will pay off credit first
                </Text>
              </View>
            ) : (
              <Text className="text-sm text-white/80">
                • Micro-credit Rs. 1,000 available
              </Text>
            )}
          </GradientPillCard>

          <Text className="mb-4 text-lg font-bold tracking-widest text-white">
            QUICK ACCESS
          </Text>

          <View className="mb-6 flex-row justify-between">
            {/* Left: QR Payment (Dark Pill) */}
            <View style={{ width: "48%" }}>
              <Pressable onPress={() => router.push("/qr-scanner")}>
                <GradientPillCard innerClassName="aspect-square items-center justify-center p-4">
                  <MaterialCommunityIcons
                    name="qrcode-scan"
                    size={32}
                    color="white"
                    className="mb-2"
                  />
                  <Text className="text-center text-sm font-bold text-white">
                    QR PAYMENT
                  </Text>
                  <Text className="text-center text-[10px] text-white/50">
                    Scan to Pay Tolls
                  </Text>
                </GradientPillCard>
              </Pressable>
            </View>

            {/* Right: Emergency (Solid Red Card) */}
            <View style={{ width: "48%" }}>
              <Pressable onPress={() => router.push("/emergency")}>
                <LinearGradient
                  colors={["#FF5F54", "#FF3B30"]}
                  className="aspect-square items-center justify-center rounded-[35px] p-4"
                >
                  <MaterialCommunityIcons
                    name="alert-circle-outline"
                    size={32}
                    color="white"
                    className="mb-2"
                  />
                  <Text className="text-center text-sm font-bold text-white">
                    EMERGENCY
                  </Text>
                  <Text className="text-center text-[10px] text-white/90">
                    Police • Fire • Ambulance
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>

          {/* Top-Up Wallet */}
          <Pressable onPress={handleTopUp}>
            <GradientPillCard
              className="mb-6"
              innerClassName="flex-row items-center px-6 py-5"
            >
              <MaterialCommunityIcons
                name="wallet-plus-outline"
                size={28}
                color="white"
              />
              <View className="ml-4">
                <Text className="text-base font-bold text-white">
                  TOP-UP WALLET
                </Text>
                <Text className="text-xs text-white/50">
                  Recharge balance using online methods
                </Text>
              </View>
            </GradientPillCard>
          </Pressable>

          {/* Request Credit Card - Only show if credit is not active */}
          {!creditActive && (
            <Pressable onPress={requestCredit}>
              <GradientPillCard
                className="mb-6"
                innerClassName="flex-row items-center px-6 py-5"
              >
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={28}
                  color="white"
                />
                <View className="ml-4">
                  <Text className="text-base font-bold text-white">
                    REQUEST CREDIT
                  </Text>
                  <Text className="text-xs text-white/50">
                    Get Rs. 1,000 instant credit
                  </Text>
                </View>
              </GradientPillCard>
            </Pressable>
          )}

          {/* Navigation & Alerts */}
          <GradientPillCard innerClassName="px-6 py-4">
            <Text className="text-xs font-bold tracking-widest text-white">
              NAVIGATION & ALERTS
            </Text>
          </GradientPillCard>
        </ScrollView>

        {/* Bottom Nav */}
        <View className="absolute bottom-6 left-6 right-6">
          <GradientPillCard
            borderRadius={40}
            innerClassName="h-20 flex-row items-center justify-around px-2"
          >
            <NavItem icon="home-outline" label="Home" active />
            <NavItem icon="map-outline" label="Maps" />

            {/* Center QR Button */}
            <LinearGradient
              colors={["#FF3B30", "#800040"]}
              className="-top-1 h-14 w-14 items-center justify-center rounded-full"
            >
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={24}
                color="white"
              />
            </LinearGradient>

            <NavItem
              icon="time-outline"
              label="History"
              onPress={() => router.push("/history")}
            />
            <NavItem
              icon="person-outline"
              label="Profile"
              onPress={() => router.push("/profile")}
            />
          </GradientPillCard>
        </View>
      </View>
    </>
  );
};

const NavItem = ({
  icon,
  label,
  active = false,
  onPress,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) => (
  <Pressable className="items-center" onPress={onPress}>
    <Ionicons name={icon} size={22} color={active ? "#fff" : "#ffffff60"} />
    <Text
      style={{ fontSize: 10 }}
      className={`${active ? "text-white" : "text-white/40"} mt-1`}
    >
      {label}
    </Text>
  </Pressable>
);

export default Index;
