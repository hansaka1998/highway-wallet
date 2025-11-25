import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-center px-4">
        Edit app/index.tsx to edit this screen.
      </Text>

      <Link href="/user" asChild>
        <Pressable>
          <Text className="text-blue-500 text-lg mt-4">Go to User</Text>
        </Pressable>
      </Link>

      <Link href="/home" asChild>
        <Pressable>
          <Text className="text-blue-500 text-lg mt-4">Go to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}
