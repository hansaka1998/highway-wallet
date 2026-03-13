import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ShadowBox from "./ShadowBox";

type SavedCard = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
};

type Props = {
  visible: boolean;
  savedCard: SavedCard | null;
  onSaveCard: (card: SavedCard) => void;
  onUseSavedCard: () => void;
};

export default function CardDetailsPanel({
  visible,
  savedCard,
  onSaveCard,
  onUseSavedCard,
}: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!visible) return null;

  const handleSave = () => {
    if (!cardNumber || !cardHolder || !expiry) return;

    onSaveCard({
      cardNumber,
      cardHolder,
      expiry,
    });

    setCardNumber("");
    setCardHolder("");
    setExpiry("");
    setCvv("");
  };

  return (
    <ShadowBox className="mb-7">
      <View className="rounded-[28px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="mb-4 flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Ionicons name="card-outline" size={22} color="#222" />
          </View>
          <View>
            <Text className="text-[16px] font-bold text-[#2d2d2d]">
              Add Bank Card
            </Text>
            <Text className="mt-1 text-[12px] text-[#8c8c8c]">
              Save card details for direct payment
            </Text>
          </View>
        </View>

        {savedCard && (
          <View className="mb-5 rounded-[20px] bg-[#f3f3f3] p-4 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Text className="text-[12px] text-[#8c8c8c]">Saved Card</Text>
            <Text className="mt-2 text-[15px] font-bold text-[#2d2d2d]">
              **** **** **** {savedCard.cardNumber.slice(-4)}
            </Text>
            <Text className="mt-1 text-[12px] text-[#8c8c8c]">
              {savedCard.cardHolder} • {savedCard.expiry}
            </Text>

            <TouchableOpacity
              onPress={onUseSavedCard}
              className="mt-4 items-center rounded-full bg-[#f3f3f3] py-3 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
            >
              <Text className="text-[13px] font-bold text-[#2d2d2d]">
                USE SAVED CARD
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <InputField
          label="Card Number"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="1234 5678 9012 3456"
        />

        <InputField
          label="Card Holder"
          value={cardHolder}
          onChangeText={setCardHolder}
          placeholder="Hansaka Perera"
        />

        <View className="mt-4 flex-row justify-between">
          <View className="w-[48%]">
            <InputField
              label="Expiry"
              value={expiry}
              onChangeText={setExpiry}
              placeholder="09/28"
            />
          </View>

          <View className="w-[48%]">
            <InputField
              label="CVV"
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          className="mt-5 flex-row items-center justify-center rounded-full bg-[#f3f3f3] py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
        >
          <MaterialCommunityIcons
            name="content-save-outline"
            size={18}
            color="#222"
          />
          <Text className="ml-2 text-[14px] font-bold text-[#2d2d2d]">
            SAVE CARD DETAILS
          </Text>
        </TouchableOpacity>
      </View>
    </ShadowBox>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <View className="mt-4">
      <Text className="mb-2 text-[12px] font-semibold text-[#7f7f7f]">
        {label}
      </Text>
      <View className="rounded-[18px] bg-[#f3f3f3] px-4 py-1 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#a0a0a0"
          className="py-3 text-[14px] text-[#2d2d2d]"
        />
      </View>
    </View>
  );
}
