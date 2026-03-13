import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function NotificationsScreen() {
  const router = useRouter();

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
            NOTIFICATIONS
          </Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            All alerts and recent wallet activity
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

          <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Feather name="more-horizontal" size={18} color="#777" />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <ShadowBox className="mb-7">
          <View className="flex-row items-center justify-between rounded-[24px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-row items-center flex-1">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Ionicons name="notifications-outline" size={22} color="#333" />
              </View>

              <View className="flex-1">
                <Text className="text-[15px] font-bold text-[#2d2d2d]">
                  3 unread notifications
                </Text>
                <Text className="mt-1 text-[12px] text-[#8d8d8d]">
                  Payment alerts, toll updates and wallet activity
                </Text>
              </View>
            </View>

            <TouchableOpacity className="rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
              <Text className="text-[12px] font-semibold text-[#333]">
                Mark all
              </Text>
            </TouchableOpacity>
          </View>
        </ShadowBox>

        {/* Today */}
        <View className="mb-4">
          <Text className="text-[16px] font-bold text-[#2d2d2d]">Today</Text>
        </View>

        <NotificationItem
          icon={
            <Ionicons name="notifications-outline" size={20} color="#444" />
          }
          title="Payment successful"
          subtitle="LKR 350 deducted at Kadawatha toll gate"
          time="5 min ago"
          unread
        />

        <NotificationItem
          icon={<MaterialCommunityIcons name="wallet-outline" size={20} color="#444" />}
          title="Wallet top-up received"
          subtitle="LKR 2,000 added from bank card"
          time="22 min ago"
          unread
        />

        <NotificationItem
          icon={<Ionicons name="star-outline" size={20} color="#444" />}
          title="Micro credit available"
          subtitle="You can now use LKR 1,000 emergency credit"
          time="1 hour ago"
          unread
        />

        {/* Earlier */}
        <View className="mb-4 mt-3">
          <Text className="text-[16px] font-bold text-[#2d2d2d]">Earlier</Text>
        </View>

        <NotificationItem
          icon={<Ionicons name="document-text-outline" size={20} color="#444" />}
          title="Highway update"
          subtitle="Central Expressway traffic advisory available"
          time="Yesterday"
        />
      </ScrollView>

      <BottomNav activeTab="home" />
    </ScreenContainer>
  );
}

function NotificationItem({
  icon,
  title,
  subtitle,
  time,
  unread = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <ShadowBox className="mb-4">
      <TouchableOpacity className="flex-row items-start justify-between rounded-[22px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="flex-row flex-1">
          <View className="mr-4 h-11 w-11 items-center justify-center rounded-[14px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            {icon}
          </View>

          <View className="flex-1 pr-3">
            <Text className="text-[15px] font-bold text-[#2d2d2d]">{title}</Text>
            <Text className="mt-1 text-[12px] leading-[18px] text-[#8c8c8c]">
              {subtitle}
            </Text>
            <Text className="mt-2 text-[11px] text-[#a0a0a0]">{time}</Text>
          </View>
        </View>

        {unread ? (
          <View className="mt-1 h-2.5 w-2.5 rounded-full bg-[#f4c61f]" />
        ) : null}
      </TouchableOpacity>
    </ShadowBox>
  );
}
