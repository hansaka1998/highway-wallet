import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function MicroCreditScreen() {
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
        {/* Top Actions */}
        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Ionicons name="arrow-back" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Feather name="sliders" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View className="mb-5">
          <Text className="text-[18px] font-bold text-[#2d2d2d]">
            MICRO CREDIT
          </Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Short-term emergency balance support
          </Text>
        </View>

        {/* Main Credit Card */}
        <ShadowBox className="mb-6">
          <View className="rounded-[28px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="mb-2 text-[11px] tracking-[1px] text-[#8c8c8c]">
              AVAILABLE CREDIT
            </Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-[28px] font-extrabold text-[#2a2a2a]">
                LKR 1,000.00
              </Text>

              <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <MaterialCommunityIcons
                  name="hand-coin-outline"
                  size={24}
                  color="#333"
                />
              </View>
            </View>

            <Text className="mt-1 text-[11px] text-[#b0b0b0]">
              Instantly usable when wallet balance is low
            </Text>

            <View className="mt-5 flex-row items-center">
              <View className="mr-3 flex-row items-center rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <View className="mr-2 h-3 w-3 rounded-full bg-[#f0c419]" />
                <Text className="text-[12px] font-semibold text-[#333]">
                  Active
                </Text>
              </View>

              <View className="rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Text className="text-[12px] font-semibold text-[#333]">
                  Due in 7 days
                </Text>
              </View>
            </View>
          </View>
        </ShadowBox>

        {/* Summary Cards */}
        <View className="mb-6">
          <Text className="mb-4 text-[13px] font-bold tracking-[1px] text-[#7f7f7f]">
            SUMMARY
          </Text>

          <View className="flex-row justify-between">
            <InfoCard title="Used" value="LKR 0.00" />
            <InfoCard title="Limit" value="LKR 1,000" />
          </View>
        </View>

        {/* Actions */}
        <View className="mb-6">
          <Text className="mb-4 text-[13px] font-bold tracking-[1px] text-[#7f7f7f]">
            ACTIONS
          </Text>

          <View className="flex-row justify-between">
            <ActionCard
              icon={<Ionicons name="flash" size={20} color="#333" />}
              title="Use Credit"
              subtitle="Pay toll when balance is low"
            />

            <ActionCard
              icon={<Ionicons name="refresh" size={20} color="#333" />}
              title="Repay"
              subtitle="Settle your used micro credit"
            />
          </View>
        </View>

        {/* Info Section */}
        <View className="mb-4">
          <Text className="mb-4 text-[13px] font-bold tracking-[1px] text-[#7f7f7f]">
            DETAILS
          </Text>

          <ShadowBox>
            <View className="rounded-[28px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <DetailRow label="Service Fee" value="LKR 50" />
              <DetailRow label="Repayment Period" value="7 Days" />
              <DetailRow label="Eligibility" value="Wallet users only" />
            </View>
          </ShadowBox>
        </View>
      </ScrollView>

      <BottomNav activeTab="wallet" />
    </ScreenContainer>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View style={{ width: "48%", padding: 4, overflow: "visible" }}>
      <View className="rounded-[22px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <Text className="text-[12px] text-[#8c8c8c]">{title}</Text>
        <Text className="mt-2 text-[16px] font-bold text-[#2d2d2d]">
          {value}
        </Text>
      </View>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={{ width: "48%", padding: 4, overflow: "visible" }}>
      <TouchableOpacity className="rounded-[22px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="mb-2 flex-row items-center">
          {icon}
          <Text className="ml-2 text-[15px] font-bold text-[#2d2d2d]">
            {title}
          </Text>
        </View>
        <Text className="text-[12px] text-[#8c8c8c]">{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="mb-3 flex-row items-center justify-between last:mb-0">
      <Text className="text-[13px] text-[#8c8c8c]">{label}</Text>
      <Text className="text-[13px] font-semibold text-[#2d2d2d]">{value}</Text>
    </View>
  );
}
