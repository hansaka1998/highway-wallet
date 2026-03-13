import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import { loginWithEmail } from "../functions/login";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const result = await loginWithEmail(email, password);
    if (!result.ok) {
      setError(result.message ?? "Login failed. Try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    router.replace("/");
  };

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: "#f3f3f3" }}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: 40,
          paddingHorizontal: 2,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 items-center">
          <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-[#f4c61f]">
            <Text className="text-[28px] font-bold text-[#222]">HW</Text>
          </View>

          <Text className="text-[24px] font-bold text-[#2d2d2d]">
            HIGHWAY WALLET
          </Text>
          <Text className="mt-2 text-[12px] text-[#8c8c8c]">
            Secure access to your smart toll wallet
          </Text>
        </View>

        <ShadowBox className="mb-6">
          <View className="rounded-[28px] bg-[#f3f3f3] px-5 py-6 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="mb-5 text-[18px] font-bold text-[#2d2d2d]">
              Sign In
            </Text>

            <LoginInput
              icon={<Feather name="mail" size={18} color="#666" />}
              label="Email Address"
              placeholder="hansaka@example.com"
              value={email}
              onChangeText={setEmail}
            />

            <LoginInput
              icon={<Feather name="lock" size={18} color="#666" />}
              label="Password"
              placeholder="Enter password"
              secure
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity className="mt-2 self-end">
              <Text className="text-[12px] font-medium text-[#7f7f7f]">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {error ? (
              <Text className="mt-3 text-[12px] font-medium text-[#c0392b]">
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="mt-6 items-center rounded-full bg-[#f3f3f3] py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
            >
              <Text className="text-[15px] font-bold text-[#2d2d2d]">
                {loading ? "LOGGING IN..." : "LOGIN"}
              </Text>
            </TouchableOpacity>
          </View>
        </ShadowBox>

        <ShadowBox className="mb-6">
          <View className="flex-row items-center justify-between rounded-[22px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-1 pr-3">
              <Text className="text-[14px] font-bold text-[#2d2d2d]">
                Quick Access
              </Text>
              <Text className="mt-1 text-[12px] text-[#8c8c8c]">
                Use your registered email and password to continue
              </Text>
            </View>

            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
              <Ionicons name="shield-checkmark-outline" size={22} color="#2d2d2d" />
            </View>
          </View>
        </ShadowBox>

        <View className="mt-auto items-center">
          <Text className="text-[12px] text-[#8c8c8c]">Don’t have an account?</Text>

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="mt-3 rounded-full bg-[#f3f3f3] px-6 py-3 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Text className="text-[13px] font-bold text-[#2d2d2d]">
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function LoginInput({
  icon,
  label,
  placeholder,
  secure = false,
  value,
  onChangeText,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  secure?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[12px] font-semibold text-[#7f7f7f]">
        {label}
      </Text>

      <View className="flex-row items-center rounded-[18px] bg-[#f3f3f3] px-4 py-1 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
        <View className="mr-3">{icon}</View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          secureTextEntry={secure}
          className="flex-1 py-3 text-[14px] text-[#2d2d2d]"
        />
      </View>
    </View>
  );
}
