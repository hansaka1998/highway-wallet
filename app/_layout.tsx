import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    KarantinaRegular: require('../assets/fonts/Karantina-Regular.ttf'),
    KarantinaBold: require('../assets/fonts/Karantina-Bold.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    InterItalic: require('../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf'),
  });

  if (fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-base text-black text-center">
          Font loading failed. Check the files in `assets/fonts`.
        </Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="index" />
          <Stack.Screen name="micro-credit" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="privacy-policies" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="sos" />
          <Stack.Screen name="scan" />
          <Stack.Screen name="top-up" />
          <Stack.Screen name="wallet" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
