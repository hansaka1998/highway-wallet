import { Image, Pressable, Text, View } from 'react-native';

type SplashProps = {
  onContinue?: () => void;
};

export default function Splash({ onContinue }: SplashProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#F1C40F] p-4">
      <View>
        <Text className="font-karantina-bold text-4xl uppercase text-black text-center">
          highway wallet
        </Text>
        <Text className="font-inter text-lg text-black mt-5 text-center">Welcome!</Text>
        <Image source={require('../assets/images/logo.png')} className="w-64 h-64 mt-5" />
        <Text className="font-inter text-sm text-black mt-5 text-center uppercase">
          Drive safe and have fun!
        </Text>
        <View className="justify-end items-center pt-40">
          <Pressable
            className="w-40 h-17 rounded-full border-2 items-center justify-center"
            onPress={onContinue}
          >
            <Text className="font-inter text-5xl font-light">{'>'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
