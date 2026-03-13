import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function WalletScreen() {
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
          <View className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Ionicons name="arrow-back" size={20} color="#333" />
          </View>

          <View className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Feather name="sliders" size={18} color="#333" />
          </View>
        </View>

        {/* Header */}
        <View className="mb-5">
          <Text className="text-[18px] font-bold text-[#2d2d2d]">WALLET</Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Balance • Top-up • Transactions
          </Text>
        </View>

        {/* Main Wallet Card */}
        <ShadowBox className="mb-6">
          <View className="rounded-[28px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="mb-2 text-[11px] tracking-[1px] text-[#8c8c8c]">
              CURRENT BALANCE
            </Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-[28px] font-extrabold text-[#2a2a2a]">
                LKR 2,500.00
              </Text>

              <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Ionicons name="wallet" size={24} color="#333" />
              </View>
            </View>

            <Text className="mt-1 text-[11px] text-[#b0b0b0]">
              Updated just now • Firestore
            </Text>

            <View className="mt-5 flex-row items-center">
              <TouchableOpacity
                onPress={() => router.push("/micro-credit")}
                className="mr-3 flex-row items-center rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
              >
                <View className="mr-2 h-3 w-3 rounded-full bg-[#f0c419]" />
                <Text className="text-[12px] font-semibold text-[#333]">
                  Credit Active
                </Text>
              </TouchableOpacity>

              <View className="rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Text className="text-[12px] font-semibold text-[#333]">
                  Limit: 1000
                </Text>
              </View>
            </View>
          </View>
        </ShadowBox>

        {/* Actions */}
        <View className="mb-6">
          <Text className="mb-4 text-[13px] font-bold tracking-[1px] text-[#7f7f7f]">
            ACTIONS
          </Text>

          <View className="flex-row justify-between">
            <WalletActionCard
              icon={<Ionicons name="flash" size={20} color="#333" />}
              title="Top-up"
              subtitle="Add money via bank"
              onPress={() => router.push("/top-up")}
            />

            <WalletActionCard
              icon={<Ionicons name="add" size={20} color="#333" />}
              title="Withdraw"
              subtitle="Transfer to bank"
            />
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[13px] font-bold tracking-[1px] text-[#7f7f7f]">
            RECENT TRANSACTIONS
          </Text>
          <Text className="text-[11px] text-[#b0b0b0]">See all</Text>
        </View>

        <TransactionItem
          title="Toll Payment"
          subtitle="Kadawatha Gate • Today"
          amount="-350.00"
          negative
        />

        <TransactionItem
          title="Top-up"
          subtitle="Bank Card • Yesterday"
          amount="+2,000.00"
        />

        <TransactionItem
          title="Toll Payment"
          subtitle="Galanigama Gate • 2 days ago"
          amount="-300.00"
          negative
        />
      </ScrollView>

      <BottomNav activeTab="wallet" />
    </ScreenContainer>
  );
}

function WalletActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <View style={{ width: "48%", padding: 4, overflow: "visible" }}>
      <TouchableOpacity
        onPress={onPress}
        className="rounded-[22px] bg-[#f3f3f3] p-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
      >
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

function TransactionItem({
  title,
  subtitle,
  amount,
  negative = false,
}: {
  title: string;
  subtitle: string;
  amount: string;
  negative?: boolean;
}) {
  return (
    <ShadowBox className="mb-3">
      <View className="flex-row items-center justify-between rounded-[22px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View>
          <Text className="text-[15px] font-bold text-[#2d2d2d]">{title}</Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">{subtitle}</Text>
        </View>

        <Text
          className={`text-[15px] font-bold ${
            negative ? "text-[#3a3a3a]" : "text-[#2e7d32]"
          }`}
        >
          {amount}
          <Text className="text-[11px] font-medium text-[#9a9a9a]"> LKR</Text>
        </Text>
      </View>
    </ShadowBox>
  );
}
