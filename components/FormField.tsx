import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

interface FormFieldProps extends TextInputProps {
  icon: keyof typeof Ionicons.glyphMap;
}

export const FormField = ({ icon, ...props }: FormFieldProps) => (
  <View className="bg-white/5 border border-white/10 rounded-2xl flex-row items-center px-4 h-16 mt-4">
    <Ionicons name={icon} size={20} color="#FF3B30" />
    <TextInput placeholderTextColor="rgba(255,255,255,0.3)" className="flex-1 ml-4 text-white font-medium" {...props} />
  </View>
);