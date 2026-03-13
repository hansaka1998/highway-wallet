import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { logoutUser } from "../functions/logout";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ProfileMenu({ visible, onClose }: Props) {
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    onClose();
    router.replace("/login");
  };

  if (!visible) return null;

  return (
    <>
      <Pressable
        onPress={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 80,
        }}
      />

      <View
        style={{
          position: "absolute",
          top: 150,
          right: 28,
          zIndex: 90,
          elevation: 20,
        }}
        className="w-48 rounded-[20px] bg-[#f3f3f3] px-3 py-3 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
      >
        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push("/profile");
          }}
          className="flex-row items-center rounded-[14px] px-3 py-3"
        >
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-[12px] bg-[#f3f3f3] shadow-[4px_4px_8px_#d9d9d9,-4px_-4px_8px_#ffffff]">
            <Feather name="edit-3" size={16} color="#333" />
          </View>
          <Text className="text-[14px] font-semibold text-[#2d2d2d]">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <View className="my-1 h-[1px] bg-[#e7e7e7]" />

        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push("/privacy-policies");
          }}
          className="flex-row items-center rounded-[14px] px-3 py-3"
        >
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-[12px] bg-[#f3f3f3] shadow-[4px_4px_8px_#d9d9d9,-4px_-4px_8px_#ffffff]">
            <Ionicons name="document-text-outline" size={16} color="#333" />
          </View>
          <Text className="text-[14px] font-semibold text-[#2d2d2d]">
            Privacy Policies
          </Text>
        </TouchableOpacity>

        <View className="my-1 h-[1px] bg-[#e7e7e7]" />

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center rounded-[14px] px-3 py-3"
        >
          <View className="mr-3 h-9 w-9 items-center justify-center rounded-[12px] bg-[#f3f3f3] shadow-[4px_4px_8px_#d9d9d9,-4px_-4px_8px_#ffffff]">
            <MaterialCommunityIcons name="logout" size={18} color="#c0392b" />
          </View>
          <Text className="text-[14px] font-semibold text-[#c0392b]">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
