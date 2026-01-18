import { View, Text, ScrollView } from "react-native";

export default function TailwindTest() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6 text-black">
          Tailwind CSS Test
        </Text>

        {/* Test 1: Background Colors */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            1. Background Colors
          </Text>
          <View className="bg-red-500 p-4 rounded-lg mb-2">
            <Text className="text-white font-bold">Red Background</Text>
          </View>
          <View className="bg-blue-500 p-4 rounded-lg mb-2">
            <Text className="text-white font-bold">Blue Background</Text>
          </View>
          <View className="bg-green-500 p-4 rounded-lg">
            <Text className="text-white font-bold">Green Background</Text>
          </View>
        </View>

        {/* Test 2: Text Styles */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            2. Text Styles
          </Text>
          <Text className="text-sm text-gray-600 mb-2">Small text</Text>
          <Text className="text-base text-gray-600 mb-2">Base text</Text>
          <Text className="text-lg text-gray-600 mb-2">Large text</Text>
          <Text className="text-2xl font-bold text-gray-800">Bold 2xl</Text>
        </View>

        {/* Test 3: Spacing */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            3. Spacing (Padding & Margins)
          </Text>
          <View className="bg-yellow-100 p-2 mb-2 border border-yellow-400">
            <Text className="text-gray-700">p-2</Text>
          </View>
          <View className="bg-yellow-100 p-4 mb-2 border border-yellow-400">
            <Text className="text-gray-700">p-4</Text>
          </View>
          <View className="bg-yellow-100 p-6 border border-yellow-400">
            <Text className="text-gray-700">p-6</Text>
          </View>
        </View>

        {/* Test 4: Border & Radius */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            4. Borders & Radius
          </Text>
          <View className="border-2 border-purple-500 rounded-lg p-4 mb-2">
            <Text className="text-gray-700">rounded-lg</Text>
          </View>
          <View className="border-2 border-purple-500 rounded-2xl p-4 mb-2">
            <Text className="text-gray-700">rounded-2xl</Text>
          </View>
          <View className="border-2 border-purple-500 rounded-full p-4 w-20 h-20 flex justify-center items-center">
            <Text className="text-gray-700 text-center">rounded-full</Text>
          </View>
        </View>

        {/* Test 5: Flexbox */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            5. Flexbox Layout
          </Text>
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 bg-indigo-500 p-3 mr-2 rounded-lg">
              <Text className="text-white text-center">Flex 1</Text>
            </View>
            <View className="flex-1 bg-indigo-500 p-3 rounded-lg">
              <Text className="text-white text-center">Flex 1</Text>
            </View>
          </View>
        </View>

        {/* Test 6: Shadow & Opacity */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3 text-gray-800">
            6. Opacity
          </Text>
          <View className="bg-orange-500 p-4 rounded-lg opacity-100 mb-2">
            <Text className="text-white">opacity-100</Text>
          </View>
          <View className="bg-orange-500 p-4 rounded-lg opacity-75 mb-2">
            <Text className="text-white">opacity-75</Text>
          </View>
          <View className="bg-orange-500 p-4 rounded-lg opacity-50">
            <Text className="text-white">opacity-50</Text>
          </View>
        </View>

        <View className="bg-green-100 p-4 rounded-lg mb-6 border-2 border-green-500">
          <Text className="text-green-800 font-bold text-lg">
            ✓ If you can see all styled elements above, Tailwind CSS is working!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
