import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  const balance = 1500; // sample data
  return <Redirect href="/welcome" />;

  return (
    <ScrollView
      className="flex-1 bg-[#f1faee] px-6 pt-16"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Title */}
      <Text className="text-black text-3xl font-bold mb-6">
        මගපෙත් Wallet
      </Text>

      {/* Balance Card */}
      <View className="bg-[#343a40] rounded-2xl p-6 mb-6 border border-[#495057]">
        <Text className="text-gray-300 text-sm">වත්මන් ශේෂය</Text>
        <Text className="text-white text-4xl font-bold mt-2">
          Rs. {balance.toFixed(2)}
        </Text>
      </View>

      {/* Top actions */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="flex-1 bg-[#495057] p-4 rounded-xl mr-2">
          <Text className="text-white text-center font-semibold text-lg">
            Top-up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-[#495057] p-4 rounded-xl ml-2">
          <Text className="text-white text-center font-semibold text-lg">
            Rs.1000 ණය
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <Text className="text-gray-400 text-lg mb-3">Quick Actions</Text>

      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="w-[48%] bg-[#343a40] p-5 rounded-xl border border-[#495057]">
          <Text className="text-white text-center text-lg">QR Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] bg-[#343a40] p-5 rounded-xl border border-[#495057]">
          <Text className="text-white text-center text-lg">History</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between">
        <TouchableOpacity className="w-[48%] bg-[#343a40] p-5 rounded-xl border border-[#495057]">
          <Text className="text-white text-center text-lg">Exit Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity className="w-[48%] bg-[#343a40] p-5 rounded-xl border border-[#495057]">
          <Text className="text-white text-center text-lg">Emergency</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
