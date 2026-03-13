import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type BottomNavProps = {
  activeTab?: "home" | "scan" | "wallet" | "profile";
};

export default function BottomNav({
  activeTab = "home",
}: BottomNavProps) {
  const router = useRouter();

  return (
    <View className="absolute bottom-6 left-5 right-5 flex-row items-center justify-between rounded-full bg-[#f3f3f3] px-6 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
      <NavItem
        active={activeTab === "home"}
        onPress={() => router.push("/")}
        icon={
          <Ionicons
            name="home"
            size={24}
            color={activeTab === "home" ? "#1f1f1f" : "#444"}
          />
        }
      />

      <NavItem
        active={activeTab === "scan"}
        onPress={() => router.push("/scan")}
        icon={
          <MaterialCommunityIcons
            name="view-grid"
            size={24}
            color={activeTab === "scan" ? "#1f1f1f" : "#444"}
          />
        }
      />

      <NavItem
        active={activeTab === "wallet"}
        onPress={() => router.push("/wallet")}
        icon={
          <View className="relative">
            <Ionicons
              name="wallet"
              size={24}
              color={activeTab === "wallet" ? "#1f1f1f" : "#444"}
            />
            <View className="absolute -right-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f0c419]" />
          </View>
        }
      />

      <NavItem
        active={activeTab === "profile"}
        onPress={() => router.push("/profile")}
        icon={
          <Ionicons
            name="person"
            size={24}
            color={activeTab === "profile" ? "#1f1f1f" : "#444"}
          />
        }
      />
    </View>
  );
}

function NavItem({
  icon,
  active = false,
  onPress,
}: {
  icon: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`h-12 w-12 items-center justify-center rounded-full ${
        active
          ? "bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          : ""
      }`}
    >
      {icon}
    </TouchableOpacity>
  );
}
