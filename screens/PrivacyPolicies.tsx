import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function PrivacyPoliciesScreen() {
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
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-[#2b2b2b]">
            PRIVACY POLICIES
          </Text>
          <View className="h-11 w-11" />
        </View>

        <ShadowBox>
          <View className="rounded-[24px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="text-[14px] leading-6 text-[#4a4a4a]">
              Your privacy is important to us. This section is a placeholder for
              your app privacy policies and data handling details. Add the
              official policy text here.
            </Text>
          </View>
        </ShadowBox>
      </ScrollView>

      <BottomNav activeTab="profile" />
    </ScreenContainer>
  );
}
