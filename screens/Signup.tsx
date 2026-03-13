import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";

export default function SignupScreen() {
  const router = useRouter();

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
            CREATE ACCOUNT
          </Text>
          <Text className="mt-2 text-[12px] text-[#8c8c8c]">
            Join your smart highway wallet
          </Text>
        </View>

        <ShadowBox className="mb-6">
          <View className="rounded-[28px] bg-[#f3f3f3] px-5 py-6 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="mb-5 text-[18px] font-bold text-[#2d2d2d]">
              Register
            </Text>

            <SignupInput
              icon={<Feather name="user" size={18} color="#666" />}
              label="Full Name"
              placeholder="Hansaka Perera"
            />

            <SignupInput
              icon={<Feather name="mail" size={18} color="#666" />}
              label="Email Address"
              placeholder="hansaka@example.com"
            />

            <SignupInput
              icon={<Ionicons name="card-outline" size={18} color="#666" />}
              label="NIC No"
              placeholder="200012345678"
            />

            <SignupInput
              icon={<Feather name="phone" size={18} color="#666" />}
              label="Phone Number"
              placeholder="+94 77 123 4567"
            />

            <SignupInput
              icon={<Feather name="lock" size={18} color="#666" />}
              label="Password"
              placeholder="Enter password"
              secure
            />

            <SignupInput
              icon={<Feather name="lock" size={18} color="#666" />}
              label="Confirm Password"
              placeholder="Re-enter password"
              secure
            />

            <TouchableOpacity className="mt-2 flex-row items-start">
              <View className="mr-2 mt-0.5 h-4 w-4 rounded-[5px] bg-[#f3f3f3] shadow-[4px_4px_8px_#d9d9d9,-4px_-4px_8px_#ffffff]" />
              <Text className="flex-1 text-[11px] leading-[16px] text-[#7f7f7f]">
                I agree to the Terms & Conditions and Privacy Policy.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace("/")}
              className="mt-6 items-center rounded-full bg-[#f3f3f3] py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
            >
              <Text className="text-[15px] font-bold text-[#2d2d2d]">
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
        </ShadowBox>

        <ShadowBox className="mb-6">
          <View className="flex-row items-center justify-between rounded-[22px] bg-[#f3f3f3] px-4 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <View className="flex-1 pr-3">
              <Text className="text-[14px] font-bold text-[#2d2d2d]">
                Account Benefits
              </Text>
              <Text className="mt-1 text-[12px] text-[#8c8c8c]">
                Manage top-ups, toll payments, notifications and emergency tools.
              </Text>
            </View>

            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
              <Ionicons name="shield-checkmark-outline" size={22} color="#2d2d2d" />
            </View>
          </View>
        </ShadowBox>

        <View className="mt-auto items-center">
          <Text className="text-[12px] text-[#8c8c8c]">Already have an account?</Text>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="mt-3 rounded-full bg-[#f3f3f3] px-6 py-3 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Text className="text-[13px] font-bold text-[#2d2d2d]">LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function SignupInput({
  icon,
  label,
  placeholder,
  secure = false,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  secure?: boolean;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[12px] font-semibold text-[#7f7f7f]">
        {label}
      </Text>

      <View className="flex-row items-center rounded-[18px] bg-[#f3f3f3] px-4 py-1 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
        <View className="mr-3">{icon}</View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          secureTextEntry={secure}
          className="flex-1 py-3 text-[14px] text-[#2d2d2d]"
        />
      </View>
    </View>
  );
}
