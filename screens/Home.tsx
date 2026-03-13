import { useState } from "react";
import { Ionicons, MaterialCommunityIcons, Feather, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";
import ProfileMenu from "../components/ProfileMenu";

export default function HomeScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Text className="text-[17px] font-bold text-[#2b2b2b]">
            HIGHWAY WALLET
          </Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Neumorphic Dashboard
          </Text>
        </View>

        {/* Profile Card */}
        <ShadowBox className="mb-5">
          <View className="relative flex-row items-center justify-between rounded-[22px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-row items-center">
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#f4c61f]">
                <Text className="text-[14px] font-bold text-[#222]">PM</Text>
              </View>

              <View>
                <Text className="text-[16px] font-bold text-[#2d2d2d]">
                  Hi, Hansaka
                </Text>
                <Text className="mt-1 text-[12px] text-[#8d8d8d]">
                  Wallet active • Firebase
                </Text>
              </View>
            </View>

            {/* More button */}
            <TouchableOpacity
              onPress={() => setMenuOpen(true)}
              className="h-11 w-11 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
              style={{ zIndex: 60 }}
            >
              <Feather name="more-vertical" size={18} color="#777" />
            </TouchableOpacity>

          </View>
        </ShadowBox>

        {/* Stats Row */}
        <ShadowBox className="mb-7">
          <View className="flex-row justify-between">
            {/* Trip Status */}
            <View className="mr-3 flex-1 rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <Text className="mb-3 text-[14px] font-bold text-[#333]">
                Trip Status
              </Text>

              <Text className="text-[12px] text-[#969696]">Arrival</Text>
              <Text className="mb-2 text-[16px] font-bold text-[#2e2e2e]">
                Kadawatha
              </Text>

              <Text className="text-[12px] text-[#969696]">Destination</Text>
              <Text className="mb-3 text-[16px] font-bold text-[#2e2e2e]">
                Galanigama
              </Text>

              <Text className="text-[12px] text-[#969696]">Balance</Text>

              <View className="mt-2 flex-row items-end justify-between">
                <Text className="text-[18px] font-extrabold text-[#2a2a2a]">
                  LKR 2,500
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/scan")}
                  className="h-14 w-14 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
                >
                  <MaterialCommunityIcons
                    name="view-grid"
                    size={24}
                    color="#2e2e2e"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Alerts */}
            <View className="w-[34%] rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <Text className="mb-4 text-[14px] font-bold text-[#333]">
                Alerts
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/notifications")}
                className="relative mb-5 self-center"
              >
                <View className="h-20 w-20 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                  <Ionicons name="notifications" size={34} color="#1f1f1f" />
                </View>
                <View className="absolute right-1 top-1 h-3 w-3 rounded-full bg-[#f0c419]" />
              </TouchableOpacity>

              <Text className="text-[12px] text-[#a0a0a0]">Latest</Text>
              <Text className="mt-1 text-[15px] font-bold text-[#2f2f2f]">
                Payment OK
              </Text>
              <Text className="mt-1 text-[12px] text-[#7b7b7b]">
                Toll deducted
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
            <ActionCard
              icon={
                <Ionicons name="map-outline" size={28} color="#222" />
              }
              label="Map"
            />
            <ActionCard
              icon={<Ionicons name="flash" size={28} color="#222" />}
              label="Top-up"
              onPress={() => router.push("/top-up")}
            />
            <ActionCard
              icon={<Ionicons name="warning" size={28} color="#222" />}
              label="SOS"
              onPress={() => router.push("/sos")}
            />
          </View>
        </View>

        {/* News */}
        <View>
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Highway News
          </Text>

          <ShadowBox>
            <View className="rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <NewsItem title="Central Expressway update" />
              <View className="h-3" />
              <NewsItem title="Port Access highway progress" />
            </View>
          </ShadowBox>
        </View>
      </ScrollView>

      <ProfileMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />

      <BottomNav activeTab="home" />
    </ScreenContainer>
  );
}

function ActionCard({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <View style={{ width: "31%", padding: 4, overflow: "visible" }}>
      <TouchableOpacity
        onPress={onPress}
        className="items-center rounded-[24px] bg-[#f3f3f3] px-3 py-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
      >
        <View className="mb-3 h-14 w-14 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
          {icon}
        </View>
        <Text className="text-[14px] font-bold text-[#2d2d2d]">{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewsItem({ title }: { title: string }) {
  return (
    <TouchableOpacity className="flex-row items-center justify-between rounded-full bg-[#f3f3f3] px-4 py-4 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
      <Text className="text-[14px] font-semibold text-[#333]">{title}</Text>
      <AntDesign name="right" size={14} color="#7b7b7b" />
    </TouchableOpacity>
  );
}
