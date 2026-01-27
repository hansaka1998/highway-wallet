import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useWallet } from "../contexts/WalletContext";
import { auth, db } from "../firebaseConfig";

// Amount Card Component
const AmountCard = ({ amount, selected, onPress, icon }: any) => (
  <Pressable onPress={onPress} className="mb-4 w-[48%]">
    {selected ? (
      <LinearGradient
        colors={["#FF5F54", "#FF3B30"]}
        className="h-40 items-center justify-center rounded-[35px] p-6 shadow-lg shadow-red-500/50"
      >
        <MaterialCommunityIcons name={icon} size={32} color="white" />
        <Text className="mt-2 text-center text-lg font-black uppercase text-white">
          RS. {amount}
        </Text>
        <Text className="text-[10px] font-bold uppercase tracking-tighter text-white/70">
          Selected
        </Text>
      </LinearGradient>
    ) : (
      <LinearGradient
        colors={["#FF4133", "#7A003C", "#FF4133"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="h-40 rounded-[35px] p-[2px]"
      >
        <View className="flex-1 items-center justify-center rounded-[33px] bg-[#0F0F12] p-4">
          <MaterialCommunityIcons name={icon} size={32} color="#FF3B30" />
          <Text className="mt-2 text-center text-lg font-black uppercase text-white">
            RS. {amount}
          </Text>
          <Text className="text-[10px] font-bold uppercase tracking-tighter text-white/30">
            Quick Pay
          </Text>
        </View>
      </LinearGradient>
    )}
  </Pressable>
);

const TopUpScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { balance, creditActive, creditAmount } = useWallet();

  const handleTopUp = async () => {
    // ගාණ තෝරාගැනීම
    const amountStr =
      selectedAmount === "Custom" ? customAmount : selectedAmount;
    const finalAmount = parseFloat(amountStr);

    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      Alert.alert("Error", "කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Please login first");

      const userRef = doc(db, "users", user.uid);

      // Calculate how much goes to credit repayment vs balance
      let amountToCredit = 0;
      let amountToBalance = finalAmount;
      let newCreditAmount = creditAmount || 0;
      let newCreditActive = creditActive;

      if (creditAmount > 0) {
        if (finalAmount >= creditAmount) {
          // Top-up is enough to pay off all debt
          amountToCredit = creditAmount;
          amountToBalance = finalAmount - creditAmount;
          newCreditAmount = 0;
          newCreditActive = false;
        } else {
          // Top-up only partially pays debt
          amountToCredit = finalAmount;
          amountToBalance = 0;
          newCreditAmount = creditAmount - finalAmount;
          newCreditActive = true;
        }
      }

      // 1. Update Firestore balance and credit
      await updateDoc(userRef, {
        balance: increment(amountToBalance),
        creditAmount: newCreditAmount,
        creditActive: newCreditActive,
        updatedAt: serverTimestamp(),
      });

      // 2. Record credit repayment transaction if applicable
      if (amountToCredit > 0) {
        await addDoc(collection(db, "transactions"), {
          userId: user.uid,
          amount: amountToCredit,
          type: "CREDIT_REPAYMENT",
          description: "Credit Repayment",
          timestamp: serverTimestamp(),
          status: "SUCCESS",
        });
      }

      // 3. Record top-up transaction for amount added to balance
      if (amountToBalance > 0) {
        await addDoc(collection(db, "transactions"), {
          userId: user.uid,
          amount: amountToBalance,
          type: "TOPUP",
          description: "Wallet Recharge",
          timestamp: serverTimestamp(),
          status: "SUCCESS",
        });
      }

      // 4. Add notification
      let notificationBody = "";
      if (amountToCredit > 0 && amountToBalance > 0) {
        notificationBody = `රු. ${amountToCredit.toFixed(2)} ණය ආපසු ගෙවා රු. ${amountToBalance.toFixed(2)} ගිණුමට එකතු විය.`;
      } else if (amountToCredit > 0) {
        notificationBody = `රු. ${amountToCredit.toFixed(2)} ණය ආපසු ගෙවා ඇත. ඉතිරි ණය: රු. ${newCreditAmount.toFixed(2)}`;
      } else {
        notificationBody = `රු. ${finalAmount.toFixed(2)} සාර්ථකව ඔබේ ගිණුමට එකතු විය.`;
      }

      await addDoc(collection(db, "notifications"), {
        userId: user.uid,
        title: "Recharge Successful",
        body: notificationBody,
        type: "payment",
        read: false,
        createdAt: serverTimestamp(),
      });

      // Success message
      let successMessage = "";
      if (amountToCredit > 0 && amountToBalance > 0) {
        successMessage = `RS ${amountToCredit.toFixed(2)} paid towards credit.\nRS ${amountToBalance.toFixed(2)} added to wallet.\nCredit fully paid!`;
      } else if (amountToCredit > 0) {
        successMessage = `RS ${amountToCredit.toFixed(2)} paid towards credit.\nRemaining credit: RS ${newCreditAmount.toFixed(2)}`;
      } else {
        successMessage = `RS ${finalAmount.toFixed(2)} added to your wallet!`;
      }

      Alert.alert("Success", successMessage, [
        { text: "Done", onPress: () => router.replace("/") },
      ]);
    } catch (error: any) {
      console.error(error);
      Alert.alert("Failed", "ගනුදෙනුව අසාර්ථකයි. කරුණාකර නැවත උත්සාහ කරන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-14">
        <Pressable
          onPress={() => router.replace("/")}
          className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-black uppercase tracking-widest text-white">
          Top Up Wallet
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        {/* Available Balance Card */}
        <View className="mb-8 flex-row items-center justify-between rounded-[30px] border border-white/10 bg-white/5 p-6">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              Current Balance
            </Text>
            <Text className="mt-1 text-2xl font-black text-white">
              RS {Number(balance ?? 0).toFixed(2)}
            </Text>
          </View>
          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#FF3B30]/10">
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color="#FF3B30"
            />
          </View>
        </View>

        <Text className="mb-6 text-xs font-bold uppercase tracking-[3px] text-white/40">
          Select Amount
        </Text>

        {/* Amount Grid */}
        <View className="flex-row flex-wrap justify-between">
          <AmountCard
            amount="500"
            icon="cash-multiple"
            selected={selectedAmount === "500"}
            onPress={() => setSelectedAmount("500")}
          />
          <AmountCard
            amount="1000"
            icon="currency-usd"
            selected={selectedAmount === "1000"}
            onPress={() => setSelectedAmount("1000")}
          />
          <AmountCard
            amount="2500"
            icon="lightning-bolt"
            selected={selectedAmount === "2500"}
            onPress={() => setSelectedAmount("2500")}
          />

          <Pressable
            onPress={() => setSelectedAmount("Custom")}
            className="mb-4 w-[48%]"
          >
            <LinearGradient
              colors={
                selectedAmount === "Custom"
                  ? ["#FF5F54", "#FF3B30"]
                  : ["#1A1A1E", "#0F0F12"]
              }
              className={`h-40 items-center justify-center rounded-[35px] border p-6 ${
                selectedAmount === "Custom"
                  ? "border-transparent"
                  : "border-white/10"
              }`}
            >
              <MaterialCommunityIcons
                name="pencil-plus"
                size={32}
                color={selectedAmount === "Custom" ? "white" : "#FF3B30"}
              />
              <Text
                className={`mt-2 text-xs font-black uppercase ${
                  selectedAmount === "Custom" ? "text-white" : "text-white/50"
                }`}
              >
                Custom
              </Text>
            </LinearGradient>
          </Pressable>
        </View>

        {selectedAmount === "Custom" && (
          <View className="mt-4 rounded-3xl border border-red-500/30 bg-white/5 p-6">
            <Text className="mb-2 text-center text-[10px] font-bold uppercase text-white/40">
              Enter Custom Amount
            </Text>
            <TextInput
              placeholder="0.00"
              placeholderTextColor="rgba(255,255,255,0.1)"
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
              className="text-center text-3xl font-black text-white"
              autoFocus
            />
          </View>
        )}

        <Pressable
          onPress={handleTopUp}
          disabled={loading}
          className="mt-10 h-16 overflow-hidden rounded-full shadow-lg shadow-red-500/20"
        >
          <LinearGradient
            colors={["#FF5F54", "#FF3B30"]}
            className="flex-1 items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-sm font-black uppercase tracking-[4px] text-white">
                Confirm Top-Up
              </Text>
            )}
          </LinearGradient>
        </Pressable>
      </ScrollView>

      <View className="absolute bottom-10 flex-row items-center self-center opacity-30">
        <MaterialCommunityIcons name="shield-check" size={14} color="white" />
        <Text className="ml-2 text-[9px] font-bold uppercase tracking-[2px] text-white">
          Secure Encrypted Transaction
        </Text>
      </View>
    </View>
  );
};

export default TopUpScreen;
