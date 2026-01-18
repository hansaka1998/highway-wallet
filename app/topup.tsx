import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TopUp() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0f0f14] px-6 pt-14">

      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold ml-5">TOP UP WALLET</Text>
      </View>

      {/* Balance Card */}
      <View className="border-2 border-[#ff4d6d] rounded-[30px] p-6 items-center mb-8">
        <Text className="text-gray-400 text-sm mb-2">CURRENT BALANCE</Text>
        <Text className="text-white text-3xl font-bold">LKR 0.00</Text>
      </View>

      {/* Quick Top Up */}
      <Text className="text-gray-400 text-sm mb-4">QUICK TOP UP</Text>
      <View className="flex-row flex-wrap justify-between">
        <TopUpButton amount="RS. 500" />
        <TopUpButton amount="RS. 1,000" />
        <TopUpButton amount="RS. 2,000" />
        <TopUpButton amount="RS. 5,000" />
      </View>

      {/* Custom Amount */}
      <TouchableOpacity className="flex-row items-center justify-center bg-[#2a2a35] py-5 rounded-2xl mt-4">
        <Ionicons name="wallet-outline" size={18} color="#f5a623" />
        <Text className="text-[#f5a623] font-semibold ml-2">CUSTOM AMOUNT</Text>
      </TouchableOpacity>

    </View>
  );
}

function TopUpButton({ amount }: { amount: string }) {
  return (
    <TouchableOpacity
      className="w-[48%] bg-[#2a2a35] py-5 rounded-2xl items-center mb-4"
      onPress={() => alert(`Top up ${amount} clicked!`)}
    >
      <Text className="text-white font-semibold">{amount}</Text>
    </TouchableOpacity>
  );
}


