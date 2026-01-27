import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

const TransactionHistory = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Firebase එකෙන් මේ යූසර්ට අදාළ ට්‍රාන්සැක්ෂන්ස් ටික කාලය අනුව පිළිවෙලට ගන්නවා
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        // Firebase timestamp එක JS Date එකකට හරවනවා
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      }));
      setTransactions(txData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header with Emergency Style Back Button */}
      <View className="flex-row items-center justify-between px-6 pt-14">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-black uppercase tracking-widest text-white">
          History
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        <Text className="mb-6 text-[10px] font-bold uppercase tracking-[3px] text-white/40">
          Recent Activity
        </Text>

        {loading ? (
          <ActivityIndicator color="#FF3B30" size="large" className="mt-20" />
        ) : transactions.length === 0 ? (
          <View className="items-center justify-center rounded-[40px] border border-dashed border-white/10 bg-white/5 py-20">
            <MaterialCommunityIcons
              name="receipt"
              size={64}
              color="#ffffff10"
            />
            <Text className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-white/50">
              No transactions yet
            </Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <LinearGradient
              key={transaction.id}
              colors={["#FF4133", "#7A003C", "#FF4133"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="mb-4 rounded-[30px] p-[1.5px]"
            >
              <View className="rounded-[28px] bg-[#0F0F12] p-5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 flex-row items-center">
                    <View
                      className={`mr-4 h-12 w-12 items-center justify-center rounded-2xl ${
                        transaction.type === "TOPUP"
                          ? "bg-green-500/10"
                          : "bg-red-500/10"
                      }`}
                    >
                      <MaterialCommunityIcons
                        name={
                          transaction.type === "TOPUP"
                            ? "wallet-plus"
                            : "highway"
                        }
                        size={24}
                        color={
                          transaction.type === "TOPUP" ? "#4CAF50" : "#FF3B30"
                        }
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-bold tracking-tight text-white">
                        {transaction.description || "Toll Payment"}
                      </Text>
                      <Text className="mt-1 text-[10px] font-bold uppercase text-white/40">
                        {formatDate(transaction.timestamp)}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text
                      className={`text-base font-black ${
                        transaction.type === "TOPUP"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {transaction.type === "TOPUP" ? "+" : "-"} RS{" "}
                      {transaction.amount.toFixed(2)}
                    </Text>
                    <Text className="text-[8px] font-bold uppercase tracking-tighter text-white/20">
                      {transaction.status || "Success"}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ))
        )}

        {/* Summary Card - Emergency Style */}
        {!loading && transactions.length > 0 && (
          <View className="mt-6 rounded-[35px] border border-white/10 bg-[#1A1A1E] p-6">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-[10px] font-black uppercase tracking-widest text-white">
                Monthly Insight
              </Text>
              <View className="rounded-full bg-red-500/20 px-3 py-1">
                <Text className="text-[8px] font-black uppercase text-[#FF3B30]">
                  Realtime
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View>
                <Text className="text-[9px] font-bold uppercase text-white/40">
                  Total Spent
                </Text>
                <Text className="text-xl font-black text-red-400">
                  {transactions
                    .filter((t) => t.type === "TOLL" || t.type === "PAYMENT")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(0)}
                </Text>
              </View>
              <View className="h-10 w-[1px] bg-white/10" />
              <View>
                <Text className="text-[9px] font-bold uppercase text-white/40">
                  Total Added
                </Text>
                <Text className="text-xl font-black text-green-400">
                  {transactions
                    .filter((t) => t.type === "TOPUP")
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(0)}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TransactionHistory;
