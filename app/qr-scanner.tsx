import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useTransactions } from "../contexts/TransactionContext";
import { useWallet } from "../contexts/WalletContext";
import { auth, db } from "../firebaseConfig";

const { width } = Dimensions.get("window");

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const { balance, deductAmount } = useWallet();
  const { addTransaction } = useTransactions();

  if (!permission) return <View className="flex-1 bg-black" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0b0b0f] p-6">
        <Text className="mb-4 text-center text-white">
          We need camera access to scan toll QRs.
        </Text>
        <Pressable
          onPress={requestPermission}
          className="rounded-full bg-[#FF3B30] px-6 py-3"
        >
          <Text className="font-bold text-white">Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    // Simulate toll fee extraction from QR data
    // In a real app, this would parse the QR data to get the toll amount
    const tollFee = 150.0; // Simulated toll fee

    if (balance >= tollFee) {
      try {
        // Deduct from wallet using WalletContext function
        const success = await deductAmount(tollFee);

        if (success) {
          // Add transaction to history
          addTransaction({
            type: "payment",
            amount: -tollFee,
            description: `Toll Payment - ${data}`,
            location: "Expressway Toll Gate",
          });

          // Add transaction to Firebase
          await addDoc(collection(db, "transactions"), {
            userId: auth.currentUser?.uid,
            type: "TOLL",
            amount: tollFee,
            description: `Toll Payment - ${data}`,
            location: "Expressway Toll Gate",
            qrData: data,
            transactionId: `txn_${Date.now()}`,
            timestamp: serverTimestamp(),
            status: "SUCCESS",
          });

          Alert.alert(
            "Payment Successful",
            `Toll payment of RS. ${tollFee.toFixed(2)} deducted from your wallet.\nRemaining balance: RS. ${(balance - tollFee).toFixed(2)}`,
            [
              {
                text: "OK",
                onPress: () => router.back(),
              },
            ],
          );
        } else {
          Alert.alert(
            "Payment Failed",
            "Unable to process toll payment. Please try again.",
            [
              {
                text: "OK",
                onPress: () => setScanned(false),
              },
            ],
          );
        }
      } catch (error) {
        console.error("Toll payment error:", error);
        Alert.alert(
          "Payment Error",
          "An error occurred while processing your toll payment. Please try again.",
          [
            {
              text: "OK",
              onPress: () => setScanned(false),
            },
          ],
        );
      }
    } else {
      Alert.alert(
        "Insufficient Balance",
        `Toll fee: RS. ${tollFee.toFixed(2)}\nYour balance: RS. ${balance.toFixed(2)}\nPlease top up your wallet.`,
        [
          {
            text: "OK",
            onPress: () => setScanned(false),
          },
        ],
      );
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header Overlay */}
      <View className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between bg-black/60 px-6 pb-5 pt-14">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <Text className="text-lg font-bold tracking-[2px] text-white">
          SCAN QR FOR TOLL PAYMENT
        </Text>
        <MaterialCommunityIcons name="flashlight" size={28} color="white" />
      </View>

      {/* Camera View */}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Scanning Frame Overlay */}
        <View className="flex-1 items-center justify-center">
          <View
            style={{
              width: width * 0.65,
              height: width * 0.8,
              borderWidth: 2,
              borderColor: "#4CAF50",
              borderStyle: "dashed",
              borderRadius: 20,
            }}
          />
        </View>

        {/* Bottom UI Overlay */}
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 px-8 pb-12 pt-6">
          <View className="mb-8">
            <Text className="text-sm font-semibold text-white/70">
              Wallet Balance
            </Text>
            <Text className="text-2xl font-black text-white">
              RS. {balance.toFixed(2)}
            </Text>
          </View>

          <View className="items-center">
            <Pressable
              onPress={() => setScanned(false)}
              className="overflow-hidden rounded-full"
            >
              <LinearGradient
                colors={["#1A1A1E", "#2D2D35"]}
                className="flex-row items-center px-8 py-4"
              >
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={24}
                  color="white"
                  className="mr-3"
                />
                <Text className="font-black tracking-widest text-white">
                  START SCANNING
                </Text>

                {/* Red Glow Effect from Screenshot */}
                <View className="absolute right-4 h-6 w-6 rounded-full bg-red-600/40 blur-md" />
              </LinearGradient>
            </Pressable>

            <Text className="mt-6 text-xs text-white/50">
              Position QR code within the frame to scan
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}
