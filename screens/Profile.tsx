import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";
import { logoutUser } from "../functions/logout";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/login");
  };

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: "#f3f3f3" }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
          paddingHorizontal: 2,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-[17px] font-bold text-[#2b2b2b]">PROFILE</Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Neumorphic account dashboard
          </Text>
        </View>

        {/* Top Buttons */}
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Main Profile Card */}
        <ShadowBox className="mb-6">
          <View className="flex-row items-center justify-between rounded-[24px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-row items-center flex-1">
              <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-[#f4c61f]">
                <Text className="text-[18px] font-bold text-[#222]">PM</Text>
              </View>

              <View className="flex-1">
                <Text className="text-[18px] font-bold text-[#2d2d2d]">
                  Hi, Hansaka
                </Text>
                <Text className="mt-1 text-[12px] text-[#8d8d8d]">
                  Wallet active • Firebase
                </Text>
                <Text className="mt-1 text-[12px] text-[#8d8d8d]">
                  Premium highway wallet user
                </Text>
              </View>
            </View>
          </View>
        </ShadowBox>

        {/* Account Status Row */}
        <ShadowBox className="mb-7">
          <View className="flex-row justify-between">
            {/* Left big card */}
            <View className="mr-3 flex-1 rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <Text className="mb-3 text-[14px] font-bold text-[#333]">
                Account Status
              </Text>

              <Text className="text-[12px] text-[#969696]">Membership</Text>
              <Text className="mb-3 text-[16px] font-bold text-[#2e2e2e]">
                Premium User
              </Text>

              <Text className="text-[12px] text-[#969696]">Wallet Balance</Text>
              <Text className="text-[22px] font-extrabold text-[#2a2a2a]">
                LKR 2,500
              </Text>

              <View className="mt-4 items-end">
                <TouchableOpacity
                  onPress={() => router.push("/wallet")}
                  className="h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
                >
                  <MaterialCommunityIcons
                    name="wallet-outline"
                    size={22}
                    color="#2e2e2e"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Right badge card */}
            <View className="w-[34%] rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <Text className="mb-4 text-[14px] font-bold text-[#333]">
                Badge
              </Text>

              <View className="relative mb-5 self-center">
                <View className="h-20 w-20 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                  <View className="h-10 w-10 items-center justify-center rounded-full bg-[#f4c61f]">
                    <Ionicons name="star" size={20} color="white" />
                  </View>
                </View>
              </View>

              <Text className="text-[12px] text-[#a0a0a0]">Tier</Text>
              <Text className="mt-1 text-[15px] font-bold text-[#2f2f2f]">
                Gold
              </Text>
            </View>
          </View>
        </ShadowBox>

        {/* Quick Actions */}
        <View className="mb-7">
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Quick Actions
          </Text>

          <View className="flex-row justify-between">
            <ProfileActionCard
              icon={<Feather name="edit-3" size={24} color="#222" />}
              label="Edit"
              subtitle="Profile data"
            />
            <ProfileActionCard
              icon={<Ionicons name="lock-closed-outline" size={24} color="#222" />}
              label="Security"
              subtitle="PIN & login"
            />
            <ProfileActionCard
              icon={<Ionicons name="color-palette-outline" size={24} color="#222" />}
              label="Theme"
              subtitle="Preferences"
            />
          </View>
        </View>

        {/* Account Settings */}
        <View>
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Account Settings
          </Text>

          <ShadowBox className="mb-4">
            <SettingItem
              icon={<Ionicons name="notifications-outline" size={20} color="#444" />}
              title="Notification settings"
            />
          </ShadowBox>

          <ShadowBox>
            <SettingItem
              icon={<Ionicons name="shield-checkmark-outline" size={20} color="#444" />}
              title="Privacy and permissions"
            />
          </ShadowBox>

          <ShadowBox className="mt-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center justify-center rounded-[18px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
            >
              <MaterialCommunityIcons name="logout" size={18} color="#c0392b" />
              <Text className="ml-2 text-[14px] font-semibold text-[#c0392b]">
                Logout
              </Text>
            </TouchableOpacity>
          </ShadowBox>
        </View>
      </ScrollView>

      <BottomNav activeTab="profile" />
    </ScreenContainer>
  );
}

function ProfileActionCard({
  icon,
  label,
  subtitle,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
}) {
  return (
    <View style={{ width: "31%", padding: 4, overflow: "visible" }}>
      <TouchableOpacity className="items-center rounded-[24px] bg-[#f3f3f3] px-3 py-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="mb-3 h-14 w-14 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
          {icon}
        </View>
        <Text className="text-[14px] font-bold text-[#2d2d2d]">{label}</Text>
        <Text className="mt-1 text-[11px] text-[#8c8c8c]">{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between rounded-[18px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
      <View className="flex-row items-center">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-[14px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
          {icon}
        </View>
        <Text className="text-[14px] font-semibold text-[#333]">{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#7b7b7b" />
    </TouchableOpacity>
  );
}
