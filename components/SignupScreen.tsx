import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { auth, db } from '../firebaseConfig';

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    vehicleNo: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    const { email, password, fullName, vehicleNo } = formData;

    if (!email || !password || !fullName || !vehicleNo) {
      Alert.alert("Error", "All fields are required to register your vehicle.");
      return;
    }

    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Initialize User Profile & Wallet in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        vehicleNo,
        walletBalance: 0,
        creditActive: false, // For the Rs. 1000 credit logic
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created and vehicle registered!");
      // Navigation handled by auth state change
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#0b0b0f]"
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-8 py-10">

        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-white text-3xl font-black tracking-[4px] uppercase">Join HiWayPay</Text>
          <Text className="text-white/40 text-xs tracking-widest mt-2 uppercase font-bold text-center">
            Register your vehicle for smart toll payments
          </Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-4">
          <InputField
            icon="person-outline"
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text: string) => setFormData({...formData, fullName: text})}
          />
          <InputField
            icon="mail-outline"
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text: string) => setFormData({...formData, email: text})}
            autoCapitalize="none"
          />
          <InputField
            icon="car-outline"
            placeholder="Vehicle Number (e.g. WP ABC-1234)"
            value={formData.vehicleNo}
            onChangeText={(text: string) => setFormData({...formData, vehicleNo: text})}
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text: string) => setFormData({...formData, password: text})}
          />
        </View>

        {/* Register Button */}
        <Pressable
          onPress={handleSignup}
          className="mt-10 overflow-hidden rounded-full h-16"
          disabled={loading}
        >
          <LinearGradient
            colors={['#FF5F54', '#FF3B30']}
            className="flex-1 items-center justify-center flex-row"
          >
            <Text className="text-white font-black tracking-[4px] uppercase text-sm">
              {loading ? "Registering..." : "Create Account"}
            </Text>
          </LinearGradient>
        </Pressable>

        {/* Footer */}
        <Pressable onPress={() => router.back()} className="mt-8 self-center">
          <Text className="text-white/40 text-xs uppercase font-bold tracking-widest">
            Already have an account? <Text className="text-white font-black">Login</Text>
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Helper component for styled inputs
const InputField = ({ icon, ...props }: any) => (
  <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-16 mt-4">
    <Ionicons name={icon} size={20} color="#FF3B30" />
    <TextInput
      placeholderTextColor="rgba(255,255,255,0.3)"
      className="flex-1 ml-4 text-white font-medium"
      {...props}
    />
  </View>
);

export default SignupScreen;