import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { useWallet } from '../contexts/WalletContext';

// Enhanced Gradient Card to match the screenshot's thicker/brighter borders
function GradientPillCard({
  children,
  className = '',
  innerClassName = '',
  borderRadius = 35,
  padding = 2,
}: {
  children: React.ReactNode,
  className?: string,
  innerClassName?: string,
  borderRadius?: number,
  padding?: number,
}) {
  return (
    <LinearGradient
      colors={["#FF4133", "#7A003C", "#FF4133"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{ borderRadius, padding }}
      className={className}
    >
      <View
        style={{ borderRadius: borderRadius - 2 }}
        className={`bg-[#0F0F12] ${innerClassName}`}
      >
        {children}
      </View>
    </LinearGradient>
  );
}

const Index = () => {
  const { balance } = useWallet();
  const router = useRouter();

  const handleTopUp = () => {
    router.push('topup' as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className='flex-1 bg-[#0b0b0f]'>
        {/* Background Glow */}
        <View className='absolute inset-0'>
          <Svg width='100%' height='100%'>
            <Defs>
              <RadialGradient id="bgGlow" cx="50%" cy="30%" r="60%">
                <Stop offset="0%" stopColor="#4D0026" stopOpacity="0.6" />
                <Stop offset="100%" stopColor="#0b0b0f" stopOpacity="1" />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#bgGlow)" />
          </Svg>
        </View>

        {/* Header */}
        <View className='pt-14 px-6 flex-row items-center justify-between'>
          <Pressable><Ionicons name='menu' size={32} color='#fff' /></Pressable>
          <Text className='text-white text-xl tracking-[4px] font-bold'>HIGHWAY PAY</Text>
          <View className='h-12 w-12 rounded-full border-2 border-white/20 overflow-hidden'>
            <Image source={{ uri: 'https://i.pravatar.cc/150' }} className='h-full w-full' />
          </View>
        </View>

        <ScrollView className='flex-1' contentContainerClassName='px-6 pt-8 pb-40'>
          
          {/* Wallet Balance Card */}
          <GradientPillCard className="mb-8" innerClassName="px-8 py-7">
            <Text className='text-white/60 text-xs font-bold tracking-widest'>WALLET BALANCE</Text>
            <Text className='text-white text-5xl font-black mt-2 mb-3'>RS. {balance.toFixed(2)}</Text>
            <Text className='text-white/80 text-sm'>• Micro-credit Rs. 1,000 available</Text>
          </GradientPillCard>

          <Text className='text-white text-lg font-bold tracking-widest mb-4'>QUICK ACCESS</Text>

          <View className='flex-row justify-between mb-6'>
            {/* Left: QR Payment (Dark Pill) */}
            <View style={{ width: '48%' }}>
              <Pressable onPress={() => router.push('qr-scanner' as any)}>
                <GradientPillCard innerClassName="aspect-square items-center justify-center p-4">
                  <MaterialCommunityIcons name="qrcode-scan" size={32} color="white" className="mb-2" />
                  <Text className="text-white font-bold text-center text-sm">QR PAYMENT</Text>
                  <Text className="text-white/50 text-[10px] text-center">Scan to Pay Tolls</Text>
                </GradientPillCard>
              </Pressable>
            </View>

            {/* Right: Emergency (Solid Red Card) */}
            <View style={{ width: '48%' }}>
              <Pressable onPress={() => router.push('emergency' as any)}>
                <LinearGradient 
                  colors={['#FF5F54', '#FF3B30']} 
                  className="aspect-square rounded-[35px] items-center justify-center p-4"
                >
                  <MaterialCommunityIcons name="alert-circle-outline" size={32} color="white" className="mb-2" />
                  <Text className="text-white font-bold text-center text-sm">EMERGENCY</Text>
                  <Text className="text-white/90 text-[10px] text-center">Police • Fire • Ambulance</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>

          {/* Top-Up Wallet */}
          <Pressable onPress={handleTopUp}>
            <GradientPillCard className="mb-6" innerClassName="flex-row items-center px-6 py-5">
              <MaterialCommunityIcons name="wallet-plus-outline" size={28} color="white" />
              <View className="ml-4">
                <Text className="text-white font-bold text-base">TOP-UP WALLET</Text>
                <Text className="text-white/50 text-xs">Recharge balance using online methods</Text>
              </View>
            </GradientPillCard>
          </Pressable>

          {/* Navigation & Alerts */}
          <GradientPillCard innerClassName="px-6 py-4">
             <Text className="text-white font-bold tracking-widest text-xs">NAVIGATION & ALERTS</Text>
          </GradientPillCard>

        </ScrollView>

        {/* Floating Notification */}
        <View className="absolute bottom-28 self-center w-[85%]">
            <View className="bg-[#1A1A1E]/90 border border-white/10 rounded-full px-5 py-3 flex-row items-center">
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/235/235861.png' }} className="w-5 h-5 mr-3" />
                <Text className="text-white text-sm flex-1">Welcome to HiWayPay!</Text>
                <View className="flex-row space-x-1">
                    <View className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <View className="w-1.5 h-1.5 rounded-full bg-white" />
                </View>
            </View>
        </View>

        {/* Bottom Nav */}
        <View className="absolute bottom-6 left-6 right-6">
          <GradientPillCard borderRadius={40} innerClassName="h-20 flex-row items-center justify-around px-2">
            <NavItem icon="home-outline" label="Home" active />
            <NavItem icon="map-outline" label="Maps" />
            
            {/* Center QR Button */}
            <LinearGradient colors={['#FF3B30', '#800040']} className="h-14 w-14 rounded-full items-center justify-center -top-1">
                <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
            </LinearGradient>

            <NavItem icon="time-outline" label="History" onPress={() => router.push('history' as any)} />
            <NavItem icon="person-outline" label="Profile" />
          </GradientPillCard>
        </View>
      </View>
    </>
  );
}

const NavItem = ({ icon, label, active = false, onPress }: { icon: any, label: string, active?: boolean, onPress?: () => void }) => (
  <Pressable className="items-center" onPress={onPress}>
    <Ionicons name={icon} size={22} color={active ? '#fff' : '#ffffff60'} />
    <Text style={{ fontSize: 10 }} className={`${active ? 'text-white' : 'text-white/40'} mt-1`}>{label}</Text>
  </Pressable>
);

export default Index;