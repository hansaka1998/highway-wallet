import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useTransactions } from '../contexts/TransactionContext';

const TransactionHistory = () => {
  const router = useRouter();
  const { transactions } = useTransactions();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="pt-14 px-6 flex-row items-center">
        <Pressable className="mr-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <Text className="text-white font-bold text-xl tracking-widest uppercase">Transaction History</Text>
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        <Text className="text-white font-bold tracking-[3px] mb-6 text-sm">RECENT TRANSACTIONS</Text>

        {transactions.length === 0 ? (
          <View className="items-center justify-center py-12">
            <MaterialCommunityIcons name="receipt" size={64} color="#ffffff20" />
            <Text className="text-white/50 text-center mt-4">No transactions yet</Text>
            <Text className="text-white/30 text-center text-sm mt-2">Your toll payments and top-ups will appear here</Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <LinearGradient
              key={transaction.id}
              colors={["#FF4133", "#7A003C", "#FF4133"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="rounded-[25px] p-[2px] mb-4"
            >
              <View className="bg-[#0F0F12] rounded-[23px] p-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                      transaction.type === 'payment' ? 'bg-red-500/20' : 'bg-green-500/20'
                    }`}>
                      <MaterialCommunityIcons
                        name={transaction.type === 'payment' ? 'cash-minus' : 'cash-plus'}
                        size={20}
                        color={transaction.type === 'payment' ? '#FF3B30' : '#4CAF50'}
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-semibold text-sm">{transaction.description}</Text>
                      {transaction.location && (
                        <Text className="text-white/50 text-xs mt-1">{transaction.location}</Text>
                      )}
                      <Text className="text-white/40 text-xs mt-1">{formatDate(transaction.timestamp)}</Text>
                    </View>
                  </View>
                  <Text className={`font-bold text-lg ${
                    transaction.type === 'payment' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {transaction.type === 'payment' ? '-' : '+'}RS. {Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          ))
        )}

        {/* Summary Card */}
        {transactions.length > 0 && (
          <LinearGradient
            colors={["#FF4133", "#7A003C", "#FF4133"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="rounded-[25px] p-[2px] mt-4"
          >
            <View className="bg-[#0F0F12] rounded-[23px] p-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white font-bold tracking-widest text-sm">SUMMARY</Text>
                <MaterialCommunityIcons name="chart-line" size={20} color="#FF3B30" />
              </View>

              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-white/60 text-xs font-semibold">TOTAL SPENT</Text>
                  <Text className="text-red-400 font-bold text-lg">
                    RS. {transactions
                      .filter(t => t.type === 'payment')
                      .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                      .toFixed(2)}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white/60 text-xs font-semibold">TOTAL ADDED</Text>
                  <Text className="text-green-400 font-bold text-lg">
                    RS. {transactions
                      .filter(t => t.type === 'topup')
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-white/60 text-xs font-semibold">TRANSACTIONS</Text>
                  <Text className="text-white font-bold text-lg">{transactions.length}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        )}
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;