import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-3xl font-bold">Home Screen</Text>
    </SafeAreaView>
  );
}
 