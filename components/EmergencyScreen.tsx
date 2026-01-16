import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, Pressable, ScrollView, Text, View } from 'react-native';

// Reusable Gradient Border Card
const ServiceCard = ({ title, sub, icon, isRed = false, phone }: any) => (
  <Pressable
    className="w-[48%] mb-4"
    onPress={() => Linking.openURL(`tel:${phone}`)}
  >
    {isRed ? (
      <LinearGradient
        colors={['#FF5F54', '#FF3B30']}
        className="rounded-[35px] p-6 h-40 items-center justify-center"
      >
        <MaterialCommunityIcons name={icon} size={40} color="white" />
        <Text className="text-white font-black mt-2 text-center text-xs tracking-tighter uppercase">{title}</Text>
        <Text className="text-white/80 text-[10px] mt-1">Call {phone}</Text>
      </LinearGradient>
    ) : (
      <LinearGradient
        colors={["#FF4133", "#7A003C", "#FF4133"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="rounded-[35px] p-[2px] h-40"
      >
        <View className="bg-[#0F0F12] rounded-[33px] flex-1 items-center justify-center p-4">
          <MaterialCommunityIcons name={icon} size={40} color="white" />
          <Text className="text-white font-black mt-2 text-center text-xs tracking-tighter uppercase">{title}</Text>
          <Text className="text-white/50 text-[10px] mt-1">Call {phone}</Text>
        </View>
      </LinearGradient>
    )}
  </Pressable>
);

const EmergencyScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState("Acquiring current location...");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Reverse Geocode for the address display shown in screenshot
      let reverse = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (reverse.length > 0) {
        const item = reverse[0];
        setAddress(`${item.name}, ${item.street}, ${item.city}, ${item.region}`);
      }
    })();
  }, []);

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="pt-14 px-6 flex-row items-center">
        <Pressable className="mr-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <Text className="text-white font-bold text-xl tracking-widest uppercase">Emergency Services</Text>
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        <Text className="text-white font-bold tracking-[3px] mb-4 text-sm">EMERGENCY SERVICES</Text>

        {/* Grid of contacts  */}
        <View className="flex-row flex-wrap justify-between">
          <ServiceCard title="Police" phone="119" icon="shield-account" />
          <ServiceCard title="Ambulance" phone="110" icon="ambulance" isRed={true} />
          <ServiceCard title="Fire Brigade" phone="111" icon="fire-truck" />
          <ServiceCard title="Breakdown" phone="1919" icon="tow-truck" />
        </View>

        {/* Location Display [cite: 21, 31, 41] */}
        <LinearGradient
          colors={["#FF4133", "#7A003C", "#FF4133"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="rounded-[35px] p-[2px] mt-4"
        >
          <View className="bg-[#0F0F12] rounded-[33px] p-6">
            <View className="flex-row items-center mb-4">
              <MaterialCommunityIcons name="map-marker-radius" size={24} color="#FF3B30" />
              <Text className="text-white font-bold ml-2 tracking-widest uppercase text-xs">Current Location</Text>
            </View>

            <View className="bg-white/5 rounded-2xl p-4 mb-4">
              <Text className="text-white/80 text-sm leading-5">{address}</Text>
            </View>

            <View className="flex-row items-center">
              <MaterialCommunityIcons name="target" size={16} color="#FF3B30" />
              <Text className="text-white/50 text-[11px] ml-2">
                GPS: {location?.coords.latitude.toFixed(6)}, {location?.coords.longitude.toFixed(6)} (±900m)
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="flex-row items-center mt-6 ml-2">
            <MaterialCommunityIcons name="cellphone" size={18} color="white" />
            <Text className="text-white/70 font-bold ml-2 text-xs uppercase tracking-widest">Emergency Contact</Text>
        </View>
      </ScrollView>

      {/* Floating Status Bar from screenshot */}
      <View className="absolute bottom-24 self-center w-[90%] bg-[#1A1A1E] border border-white/10 rounded-full px-5 py-3 flex-row items-center">
        <MaterialCommunityIcons name="map-marker-check" size={20} color="#FF3B30" />
        <Text className="text-white text-xs ml-3">Location access granted. Acquiring current location...</Text>
      </View>
    </View>
  );
};

export default EmergencyScreen;