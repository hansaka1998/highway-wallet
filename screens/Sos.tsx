import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function SosScreen() {
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
          <Text className="text-[18px] font-bold text-[#2d2d2d]">
            EMERGENCY SOS
          </Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Send GPS alert to emergency support
          </Text>
        </View>

        {/* Top buttons */}
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
          >
            <Ionicons name="arrow-back" size={21} color="#222" />
          </TouchableOpacity>

          <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="h-5 w-5 rounded-full bg-[#d8d8d8]" />
          </TouchableOpacity>
        </View>

        {/* Info card */}
        <ShadowBox className="mb-6">
          <View className="flex-row items-center justify-between rounded-[28px] bg-[#f3f3f3] px-5 py-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-1 pr-4">
              <Text className="text-[14px] font-bold text-[#2d2d2d]">
                Before you send SOS
              </Text>
              <Text className="mt-3 text-[12px] leading-[18px] text-[#7f7f7f]">
                Your current location will be shared with support.
              </Text>
              <Text className="mt-1 text-[12px] leading-[18px] text-[#7f7f7f]">
                Use only during emergencies.
              </Text>
            </View>

            <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
              <View className="h-4 w-4 rounded-full bg-[#c8c8c8] items-center justify-center">
                <View className="h-2.5 w-2.5 rounded-full bg-[#f0c419]" />
              </View>
            </View>
          </View>
        </ShadowBox>

        {/* SOS button card */}
        <ShadowBox className="mb-6">
          <View className="items-center rounded-[30px] bg-[#f3f3f3] px-5 py-8 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="h-[230px] w-[230px] items-center justify-center rounded-full bg-[#f3f3f3] shadow-[12px_12px_24px_#d9d9d9,-12px_-12px_24px_#ffffff]">
              <View className="h-[175px] w-[175px] items-center justify-center rounded-full bg-[#f3f3f3] shadow-[10px_10px_20px_#d9d9d9,-10px_-10px_20px_#ffffff]">
                <TouchableOpacity className="h-[145px] w-[145px] items-center justify-center rounded-full bg-[#ff4141]">
                  <Text className="text-[28px] font-extrabold text-white">SOS</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text className="mt-6 text-[12px] text-[#7f7f7f]">
              Tap to send emergency alert
            </Text>
          </View>
        </ShadowBox>

        {/* Quick contacts */}
        <View className="mb-4">
          <Text className="mb-4 text-[14px] font-bold text-[#2d2d2d]">
            QUICK CONTACTS
          </Text>

          <ContactCard
            icon={<MaterialCommunityIcons name="police-badge-outline" size={22} color="#444" />}
            title="Police"
            subtitle="Call emergency services"
          />

          <ContactCard
            icon={<Ionicons name="medical" size={22} color="#444" />}
            title="Ambulance"
            subtitle="Medical support"
          />
        </View>
      </ScrollView>

      <BottomNav activeTab="home" />
    </ScreenContainer>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <ShadowBox className="mb-4">
      <TouchableOpacity className="flex-row items-center justify-between rounded-[24px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="flex-row items-center">
          <View className="mr-4 h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            {icon}
          </View>

          <View>
            <Text className="text-[15px] font-bold text-[#2d2d2d]">{title}</Text>
            <Text className="mt-1 text-[12px] text-[#7f7f7f]">{subtitle}</Text>
          </View>
        </View>

        <Ionicons name="chevron-forward" size={18} color="#7f7f7f" />
      </TouchableOpacity>
    </ShadowBox>
  );
}
