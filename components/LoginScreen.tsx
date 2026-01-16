import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { auth } from '../firebaseConfig';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success - navigation will be handled by auth state
      router.replace('/'); // Navigate to dashboard
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#0b0b0f]"
    >
      <View className="flex-1 px-8 justify-center">

        {/* Brand/Logo Area */}
        <View className="items-center mb-12">
          <View className="bg-[#FF3B30] w-20 h-20 rounded-3xl items-center justify-center rotate-12 shadow-2xl shadow-red-500/50">
            <MaterialCommunityIcons name="road-variant" size={50} color="white" className="-rotate-12" />
          </View>
          <Text className="text-white text-3xl font-black tracking-[5px] mt-6 uppercase">HiWayPay</Text>
          <Text className="text-white/40 text-xs tracking-widest mt-2 uppercase font-bold">Expressway Digital Wallet</Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-16">
            <Ionicons name="mail-outline" size={20} color="#FF3B30" />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="flex-1 ml-4 text-white font-medium"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-16 mt-4">
            <Ionicons name="lock-closed-outline" size={20} color="#FF3B30" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="flex-1 ml-4 text-white font-medium"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* Forgot Password */}
        <Pressable className="mt-4 self-end">
          <Text className="text-[#FF3B30] text-xs font-bold uppercase tracking-widest">Forgot Password?</Text>
        </Pressable>

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          className="mt-10 overflow-hidden rounded-full h-16"
          disabled={loading}
        >
          <LinearGradient
            colors={['#FF5F54', '#FF3B30']}
            className="flex-1 items-center justify-center flex-row"
          >
            {loading ? (
               <Text className="text-white font-black tracking-[4px] uppercase text-sm">Processing...</Text>
            ) : (
              <>
                <Text className="text-white font-black tracking-[4px] uppercase text-sm">Secure Login</Text>
                <Ionicons name="arrow-forward" size={18} color="white" className="ml-2" />
              </>
            )}
          </LinearGradient>
        </Pressable>

        {/* Sign Up Footer */}
        <View className="flex-row justify-center mt-10">
          <Text className="text-white/40 text-xs uppercase font-bold tracking-widest">New User?</Text>
          <Pressable onPress={() => router.push('/signup')}>
            <Text className="text-white text-xs uppercase font-black tracking-widest ml-2">Create Account</Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;