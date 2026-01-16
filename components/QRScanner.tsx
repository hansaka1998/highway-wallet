import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  if (!permission) return <View className="flex-1 bg-black" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-[#0b0b0f] items-center justify-center p-6">
        <Text className="text-white text-center mb-4">We need camera access to scan toll QRs.</Text>
        <Pressable onPress={requestPermission} className="bg-[#FF3B30] px-6 py-3 rounded-full">
          <Text className="text-white font-bold">Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true);
    // Logic to handle simulated payment [cite: 34]
    console.log(`Scanned QR Data: ${data}`);
    alert(`Toll Payment Initiated for: ${data}`);
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header Overlay */}
      <View className="absolute top-0 left-0 right-0 z-10 pt-14 pb-5 px-6 bg-black/60 flex-row items-center justify-between">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <Text className="text-white font-bold tracking-[2px] text-lg">SCAN QR FOR TOLL PAYMENT</Text>
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
              borderColor: '#4CAF50',
              borderStyle: 'dashed',
              borderRadius: 20
            }}
          />
        </View>

        {/* Bottom UI Overlay */}
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 pt-6 pb-12 px-8">
          <View className="mb-8">
            <Text className="text-white/70 text-sm font-semibold">Wallet Balance</Text>
            <Text className="text-white text-2xl font-black">RS. 2450.00</Text>
          </View>

          <View className="items-center">
            <Pressable
              onPress={() => setScanned(false)}
              className="overflow-hidden rounded-full"
            >
              <LinearGradient
                colors={['#1A1A1E', '#2D2D35']}
                className="flex-row items-center px-8 py-4"
              >
                <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" className="mr-3" />
                <Text className="text-white font-black tracking-widest">START SCANNING</Text>

                {/* Red Glow Effect from Screenshot */}
                <View className="absolute right-4 w-6 h-6 rounded-full bg-red-600/40 blur-md" />
              </LinearGradient>
            </Pressable>

            <Text className="text-white/50 text-xs mt-6">
              Position QR code within the frame to scan
            </Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}