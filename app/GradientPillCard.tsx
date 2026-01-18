import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type GradientPillCardProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  borderRadius?: number;
  padding?: number;
  onPress?: () => void;
};

export default function GradientPillCard({
  children,
  className = "",
  innerClassName = "",
  borderRadius = 38,
  padding = 2.5,
  onPress,
}: GradientPillCardProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={className}
    >
      <LinearGradient
        colors={
          pressed
            ? ["#ff758f", "#ff006e", "#ff758f"] // 🔥 pressed gradient
            : ["#ff3b30", "#b0066b", "#ff3b30"] // normal gradient
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: borderRadius,
          padding: padding,
        }}
      >
        <View
          style={{ borderRadius: borderRadius - 2 }}
          className={`bg-[#121214] ${innerClassName}`}
        >
          {children}
        </View>
      </LinearGradient>
    </Pressable>
  );
}
