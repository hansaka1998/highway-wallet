import { Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const User = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-center px-4">User Page</Text>

      <Link href="/" asChild>
        <Pressable>
          <Text className="text-blue-500 text-lg mt-4">Back to Index</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
};

export default User;
