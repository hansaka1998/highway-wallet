import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import BottomNav from "../components/BottomNav";

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [autoPaymentEnabled, setAutoPaymentEnabled] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <ScreenContainer>
      {/* Header */}
      <View className="mb-6">
        <Text className="text-[22px] font-bold text-[#2d2d2d]">SCAN QR</Text>
        <Text className="mt-1 text-[12px] text-[#8c8c8c]">
          Pay at toll gate using QR
        </Text>
      </View>

      {/* Top Buttons */}
      <View className="mb-6 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
        >
          <Ionicons name="arrow-back" size={20} color="#222" />
        </TouchableOpacity>

        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
          <Ionicons name="flash" size={20} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Scanner Card */}
      <ShadowBox className="mb-5">
        <View className="rounded-[26px] bg-[#f3f3f3] px-4 py-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
          <View className="items-center rounded-[22px] bg-[#f3f3f3] px-4 py-8 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            {/* Camera Frame */}
            <View className="relative h-[170px] w-[170px] overflow-hidden rounded-[20px] bg-black shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
              {permission?.granted ? (
                <CameraView
                  facing="back"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
              ) : (
                <View className="flex-1 items-center justify-center bg-[#e9e9e9]">
                  <Text className="text-[11px] text-[#777]">
                    Camera permission required
                  </Text>
                </View>
              )}

              {/* dark overlay */}
              <View className="absolute inset-0 bg-black/10" />

              {/* top left */}
              <View className="absolute left-5 top-5 h-7 w-7 border-l-[4px] border-t-[4px] border-[#f0c419]" />
              {/* top right */}
              <View className="absolute right-5 top-5 h-7 w-7 border-r-[4px] border-t-[4px] border-[#f0c419]" />
              {/* bottom left */}
              <View className="absolute bottom-5 left-5 h-7 w-7 border-b-[4px] border-l-[4px] border-[#f0c419]" />
              {/* bottom right */}
              <View className="absolute bottom-5 right-5 h-7 w-7 border-b-[4px] border-r-[4px] border-[#f0c419]" />

              {/* center scan line */}
              <View className="absolute left-[28px] top-[83px] h-[3px] w-[114px] rounded-full bg-[#f0c419]" />
            </View>

            <Text className="mt-4 text-[11px] text-[#8d8d8d]">
              Align QR inside the frame
            </Text>
          </View>
        </View>
      </ShadowBox>

      {/* Auto Payment */}
      <ShadowBox className="mb-5">
        <TouchableOpacity
          onPress={() => setAutoPaymentEnabled(!autoPaymentEnabled)}
          className="flex-row items-center justify-between rounded-full bg-[#f3f3f3] px-5 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
        >
          <View className="flex-1 pr-3">
            <Text className="text-[13px] font-semibold text-[#2d2d2d]">
              Auto Payment
            </Text>
            <Text className="mt-1 text-[11px] text-[#8c8c8c]">
              Balance will be checked and deducted automatically.
            </Text>
          </View>

          <View
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{
              backgroundColor: autoPaymentEnabled ? "#e8ffcc" : "#f3f3f3",
              shadowColor: autoPaymentEnabled ? "#d9ff66" : "#d9d9d9",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: autoPaymentEnabled ? 0.95 : 0.4,
              shadowRadius: autoPaymentEnabled ? 10 : 4,
              elevation: autoPaymentEnabled ? 10 : 2,
            }}
          >
            <Ionicons
              name={autoPaymentEnabled ? "checkmark" : "add"}
              size={18}
              color={autoPaymentEnabled ? "#6bbf00" : "#222"}
            />
          </View>
        </TouchableOpacity>
      </ShadowBox>

      {/* Open Camera Button */}
      <ShadowBox className="mb-6">
        <TouchableOpacity
          onPress={() => {
            if (!permission?.granted) {
              requestPermission();
            }
          }}
          className="items-center rounded-full bg-[#f3f3f3] py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
        >
          <Text className="text-[14px] font-bold text-[#2d2d2d]">
            ADD TO PAY
          </Text>
        </TouchableOpacity>
      </ShadowBox>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Reusable Bottom Nav */}
      <BottomNav activeTab="scan" />
    </ScreenContainer>
  );
}
