import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

const { height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // Animate the logo and text in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Hold for 2.5 seconds then navigate
    const timer = setTimeout(() => {
      handleFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, handleFinish]);

  return (
    <View className="flex-1 bg-[#0b0b0f] items-center justify-center">
      {/* Background radial-like gradient effect */}
      <LinearGradient
        colors={['#4D0026', 'transparent']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: height * 0.5,
        }}
      />

      <Animated.View 
        style={{ 
          opacity: fadeAnim, 
          transform: [{ translateY: slideAnim }],
          alignItems: 'center' 
        }}
      >
        {/* App Icon / Logo */}
        <LinearGradient
          colors={['#FF3B30', '#800040']}
          className="h-24 w-24 rounded-[24px] items-center justify-center mb-6 shadow-2xl shadow-red-500/50"
        >
          <MaterialCommunityIcons name="road-variant" size={50} color="white" />
        </LinearGradient>

        {/* App Title */}
        <Text className="text-white text-4xl font-black tracking-[6px]">
          HIWAYPAY
        </Text>
        
        {/* Tagline based on project goals */}
        <Text className="text-white/50 text-xs mt-2 tracking-[2px] font-semibold">
          SMART TOLL & EMERGENCY SUPPORT
        </Text>
      </Animated.View>

      {/* Loading Indicator at Bottom */}
      <View className="absolute bottom-16">
         <Text className="text-white/30 text-[10px] tracking-widest">
           SECURED BY SRI LANKA EXPRESSWAYS
         </Text>
      </View>
    </View>
  );
};

export default SplashScreen;