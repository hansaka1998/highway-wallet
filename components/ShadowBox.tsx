import React from "react";
import { View } from "react-native";

export default function ShadowBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={className}
      style={{
        padding: 5,
        overflow: "visible",
      }}
    >
      {children}
    </View>
  );
}
