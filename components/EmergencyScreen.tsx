import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

const ServiceCard = ({ title, phone, icon, isRed = false }: any) => (
  <Pressable
    className="mb-4 w-[48%]"
    onPress={() => Linking.openURL(`tel:${phone}`)}
  >
    <LinearGradient
      colors={
        isRed ? ["#FF5F54", "#FF3B30"] : ["#FF4133", "#7A003C", "#FF4133"]
      }
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="h-36 rounded-[35px] p-[2px]"
    >
      <View
        className={`${isRed ? "bg-transparent" : "bg-[#0F0F12]"} flex-1 items-center justify-center rounded-[33px] p-4`}
      >
        <MaterialCommunityIcons
          name={icon}
          size={32}
          color={isRed ? "white" : "#FF3B30"}
        />
        <Text
          className={`mt-2 text-center text-[11px] font-black uppercase tracking-tighter ${isRed ? "text-white" : "text-white"}`}
        >
          {title}
        </Text>
        <Text
          className={`${isRed ? "text-white/70" : "text-white/40"} mt-1 text-[9px] font-bold`}
        >
          {phone}
        </Text>
      </View>
    </LinearGradient>
  </Pressable>
);

const EmergencyScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState("Acquiring location...");
  const [guardianPhone, setGuardianPhone] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // 1. GPS Permission & Location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        let reverse = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        if (reverse.length > 0) {
          const item = reverse[0];
          setAddress(`${item.name || ""}, ${item.city || ""}`);
        }
      }

      // 2. Fetch Guardian Contact from Firestore
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setGuardianPhone(userDoc.data().emergencyContact || "");
        }
      }
    })();
  }, []);

  const sendSOS = async () => {
    if (!location) {
      Alert.alert("Wait", "Still acquiring your location...");
      return;
    }

    const { latitude, longitude } = location.coords;
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `🚨 EMERGENCY HELP NEEDED! 🚨\nMy current location: ${mapsUrl}`;

    Alert.alert(
      "SOS Alert",
      `Emergency message would be sent to ${guardianPhone}\n\n${message}`,
    );
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-6 pt-14">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-black uppercase tracking-widest text-white">
          Emergency
        </Text>
        <View className="w-12" />
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        {/* SOS BUTTON */}
        <Pressable onPress={sendSOS} className="mb-8">
          <LinearGradient
            colors={["#FF0000", "#7A0000"]}
            className="items-center justify-center rounded-[40px] border border-white/20 p-8 shadow-2xl shadow-red-600/50"
          >
            <MaterialCommunityIcons
              name="alert-decagram"
              size={60}
              color="white"
            />
            <Text className="mt-3 text-xl font-black uppercase tracking-[4px] text-white">
              Send SOS
            </Text>
            <Text className="mt-1 text-center text-[10px] font-bold uppercase tracking-widest text-white/60">
              Alert Guardian with Location
            </Text>
          </LinearGradient>
        </Pressable>

        <Text className="mb-6 text-[10px] font-bold uppercase tracking-[3px] text-white/40">
          Service Hotlines
        </Text>

        <View className="flex-row flex-wrap justify-between">
          <ServiceCard title="Police" phone="119" icon="shield-account" />
          <ServiceCard
            title="Ambulance"
            phone="110"
            icon="ambulance"
            isRed={true}
          />
          <ServiceCard title="Fire" phone="111" icon="fire-truck" />
          <ServiceCard title="Highway" phone="1969" icon="car-emergency" />
        </View>

        {/* Location Info */}
        <View className="mt-6 rounded-[30px] border border-white/10 bg-white/5 p-6">
          <View className="mb-2 flex-row items-center">
            <MaterialCommunityIcons
              name="map-marker-radius"
              size={20}
              color="#FF3B30"
            />
            <Text className="ml-2 text-xs font-bold uppercase tracking-widest text-white">
              Current Location
            </Text>
          </View>
          <Text className="text-sm font-medium text-white/70">{address}</Text>
        </View>
      </ScrollView>

      {/* Footer Status */}
      <View className="absolute bottom-10 flex-row items-center self-center rounded-full border border-white/5 bg-[#1A1A1E] px-4 py-2">
        <View
          className={`h-2 w-2 rounded-full ${location ? "bg-green-500" : "bg-orange-500"} mr-2`}
        />
        <Text className="text-[9px] font-bold uppercase tracking-widest text-white/40">
          {location ? "GPS Active" : "Acquiring GPS..."}
        </Text>
      </View>
    </View>
  );
};

export default EmergencyScreen;
