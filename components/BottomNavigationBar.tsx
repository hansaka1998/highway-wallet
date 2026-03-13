import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

type BottomNavigationBarProps = {
  activeTab: "home" | "scan" | "wallet";
  onPressHome: () => void;
  onPressScan: () => void;
  onPressWallet: () => void;
};

export default function BottomNavigationBar({
  activeTab,
  onPressHome,
  onPressScan,
  onPressWallet,
}: BottomNavigationBarProps) {

  return (
    <View className="absolute bottom-6 left-6 right-6 flex-row items-center justify-between rounded-full bg-[#f3f3f3] px-6 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
      <NavItem
        active={activeTab === "home"}
        onPress={onPressHome}
        icon={<Ionicons name="home" size={22} color={activeTab === "home" ? "#1f1f1f" : "#444"} />}
      />
      <NavItem
        active={activeTab === "scan"}
        onPress={onPressScan}
        icon={<Ionicons name="grid" size={22} color={activeTab === "scan" ? "#1f1f1f" : "#444"} />}
      />
      <NavItem
        active={activeTab === "wallet"}
        onPress={onPressWallet}
        icon={
          <View className="relative">
            <Ionicons name="wallet" size={22} color={activeTab === "wallet" ? "#1f1f1f" : "#444"} />
            {activeTab !== "wallet" ? (
              <View className="absolute -right-1 top-0 h-2.5 w-2.5 rounded-full bg-[#f0c419]" />
            ) : null}
          </View>
        }
      />
      <NavItem icon={<Ionicons name="person" size={22} color="#444" />} />
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
