import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ShadowBox from "./ShadowBox";

type SavedBank = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
};

type Props = {
  visible: boolean;
  savedBank: SavedBank | null;
  onSaveBank: (bank: SavedBank) => void;
  onUseSavedBank: () => void;
};

export default function BankTransferPanel({
  visible,
  savedBank,
  onSaveBank,
  onUseSavedBank,
}: Props) {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  if (!visible) return null;

  const handleSave = () => {
    if (!bankName || !accountNumber || !accountHolder) return;

    onSaveBank({
      bankName,
      accountNumber,
      accountHolder,
    });

    setBankName("");
    setAccountNumber("");
    setAccountHolder("");
  };

  return (
    <ShadowBox className="mb-7">
      <View className="rounded-[28px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
        <View className="mb-4 flex-row items-center">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <MaterialCommunityIcons name="bank-outline" size={22} color="#222" />
          </View>

          <View>
            <Text className="text-[16px] font-bold text-[#2d2d2d]">
              Bank Transfer
            </Text>
            <Text className="mt-1 text-[12px] text-[#8c8c8c]">
              Add bank account for direct payment
            </Text>
          </View>
        </View>

        {savedBank && (
          <View className="mb-5 rounded-[20px] bg-[#f3f3f3] p-4 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Text className="text-[12px] text-[#8c8c8c]">Saved Bank</Text>

            <Text className="mt-2 text-[15px] font-bold text-[#2d2d2d]">
              {savedBank.bankName}
            </Text>

            <Text className="mt-1 text-[12px] text-[#8c8c8c]">
              {savedBank.accountNumber}
            </Text>

            <Text className="mt-1 text-[12px] text-[#8c8c8c]">
              {savedBank.accountHolder}
            </Text>

            <TouchableOpacity
              onPress={onUseSavedBank}
              className="mt-4 items-center rounded-full bg-[#f3f3f3] py-3 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
            >
              <Text className="text-[13px] font-bold text-[#2d2d2d]">
                USE SAVED BANK
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <InputField
          label="Bank Name"
          value={bankName}
          onChangeText={setBankName}
          placeholder="Commercial Bank"
        />

        <InputField
          label="Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          placeholder="1234567890"
        />

        <InputField
          label="Account Holder"
          value={accountHolder}
          onChangeText={setAccountHolder}
          placeholder="Hansaka Perera"
        />

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
            SAVE BANK DETAILS
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
