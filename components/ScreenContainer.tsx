import React from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ScreenContainer({
  children,
  className = "",
}: ScreenContainerProps) {
  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{ flex: 1, backgroundColor: "#f3f3f3" }}
    >
      <View
        className={`flex-1 ${className}`}
        style={{
          flex: 1,
          backgroundColor: "#f3f3f3",
          paddingHorizontal: 24,
          paddingTop: Platform.OS === "android" ? 12 : 6,
          overflow: "visible",
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
