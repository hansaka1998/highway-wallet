import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BankTransferPanel from "../components/BankTransferPanel";
import BottomNav from "../components/BottomNav";
import CardDetailsPanel from "../components/CardDetailsPanel";
import ScreenContainer from "../components/ScreenContainer";
import ShadowBox from "../components/ShadowBox";
import WalletAppPanel from "../components/WalletAppPanel";

export default function TopUpScreen() {
  const router = useRouter();
  const [showCardPanel, setShowCardPanel] = useState(false);
  const [savedCard, setSavedCard] = useState<{
    cardNumber: string;
    cardHolder: string;
    expiry: string;
  } | null>(null);
  const [showBankPanel, setShowBankPanel] = useState(false);
  const [savedBank, setSavedBank] = useState<{
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  } | null>(null);
  const [showWalletPanel, setShowWalletPanel] = useState(false);
  const [savedWallet, setSavedWallet] = useState<{
    provider: string;
    walletId: string;
    accountName: string;
  } | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "bank" | "wallet">("card");

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        style={{ backgroundColor: "#f3f3f3" }}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
          paddingHorizontal: 2,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6">
          <Text className="text-[17px] font-bold text-[#2b2b2b]">TOP UP</Text>
          <Text className="mt-1 text-[12px] text-[#8c8c8c]">
            Add balance to your highway wallet
          </Text>
        </View>

        <View className="mb-6 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]"
          >
            <Ionicons name="arrow-back" size={20} color="#222" />
          </TouchableOpacity>

          <TouchableOpacity className="h-11 w-11 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
            <Feather name="more-vertical" size={18} color="#777" />
          </TouchableOpacity>
        </View>

        <ShadowBox className="mb-7">
          <View className="rounded-[28px] bg-[#f3f3f3] p-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="mb-2 text-[11px] tracking-[1px] text-[#8c8c8c]">
              CURRENT BALANCE
            </Text>

            <View className="flex-row items-center justify-between">
              <Text className="text-[30px] font-extrabold text-[#2a2a2a]">
                LKR 2,500
              </Text>

              <View className="h-12 w-12 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Ionicons name="wallet" size={24} color="#333" />
              </View>
            </View>

            <Text className="mt-1 text-[11px] text-[#b0b0b0]">
              Updated just now - Firebase
            </Text>

            <View className="mt-5 flex-row items-center">
              <View className="mr-3 flex-row items-center rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <View className="mr-2 h-3 w-3 rounded-full bg-[#f0c419]" />
                <Text className="text-[12px] font-semibold text-[#333]">
                  Top-up Ready
                </Text>
              </View>

              <View className="rounded-full bg-[#f3f3f3] px-4 py-2 shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
                <Text className="text-[12px] font-semibold text-[#333]">
                  Limit: 5000
                </Text>
              </View>
            </View>
          </View>
        </ShadowBox>

        <View className="mb-7">
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Payment Method
          </Text>

          <View className="flex-row justify-between">
            <MethodCard
              icon={<Ionicons name="card-outline" size={24} color="#222" />}
              label="Bank Card"
              subtitle="Visa / Master"
              active={selectedMethod === "card"}
              onPress={() => {
                setSelectedMethod("card");
                setShowCardPanel(true);
                setShowBankPanel(false);
                setShowWalletPanel(false);
              }}
            />
            <MethodCard
              icon={
                <MaterialCommunityIcons name="bank-outline" size={24} color="#222" />
              }
              label="Bank"
              subtitle="Direct transfer"
              active={selectedMethod === "bank"}
              onPress={() => {
                setSelectedMethod("bank");
                setShowBankPanel(true);
                setShowCardPanel(false);
                setShowWalletPanel(false);
              }}
            />
            <MethodCard
              icon={<Ionicons name="wallet-outline" size={24} color="#222" />}
              label="Wallet App"
              subtitle="Digital pay"
              active={selectedMethod === "wallet"}
              onPress={() => {
                setSelectedMethod("wallet");
                setShowWalletPanel(true);
                setShowCardPanel(false);
                setShowBankPanel(false);
              }}
            />
          </View>
        </View>

        <CardDetailsPanel
          visible={showCardPanel}
          savedCard={savedCard}
          onSaveCard={(card) => {
            setSavedCard(card);
          }}
          onUseSavedCard={() => {
            setSelectedMethod("card");
          }}
        />

        <BankTransferPanel
          visible={showBankPanel}
          savedBank={savedBank}
          onSaveBank={(bank) => setSavedBank(bank)}
          onUseSavedBank={() => setSelectedMethod("bank")}
        />

        <WalletAppPanel
          visible={showWalletPanel}
          savedWallet={savedWallet}
          onSaveWallet={(wallet) => setSavedWallet(wallet)}
          onUseSavedWallet={() => setSelectedMethod("wallet")}
        />

        <View className="mb-7">
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Select Amount
          </Text>

          <View className="flex-row justify-between">
            <AmountPill label="LKR 500" />
            <AmountPill label="LKR 1000" />
            <AmountPill label="LKR 2000" active />
            <AmountPill label="More" compact />
          </View>
        </View>

        <View className="mb-7">
          <Text className="mb-4 text-[16px] font-bold text-[#2d2d2d]">
            Custom Amount
          </Text>

          <ShadowBox>
            <View className="rounded-[24px] bg-[#f3f3f3] px-5 py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
              <Text className="text-[12px] text-[#8c8c8c]">Amount</Text>
              <Text className="mt-2 text-[26px] font-bold text-[#2d2d2d]">
                LKR 2,000.00
              </Text>
            </View>
          </ShadowBox>
        </View>

        <ShadowBox className="mb-4">
          <TouchableOpacity className="items-center rounded-full bg-[#f3f3f3] py-4 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]">
            <Text className="text-[15px] font-bold text-[#2d2d2d]">
              CONFIRM TOP UP
            </Text>
          </TouchableOpacity>
        </ShadowBox>
      </ScrollView>

      <BottomNav activeTab="wallet" />
    </ScreenContainer>
  );
}

function MethodCard({
  icon,
  label,
  subtitle,
  active = false,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <View style={{ width: "31%", padding: 4, overflow: "visible" }}>
      <TouchableOpacity
        onPress={onPress}
        className="items-center rounded-[24px] bg-[#f3f3f3] px-3 py-5 shadow-[8px_8px_16px_#d9d9d9,-8px_-8px_16px_#ffffff]"
        style={{
          borderWidth: active ? 2 : 0,
          borderColor: active ? "#f4c61f" : "transparent",
        }}
      >
        <View className="mb-3 h-14 w-14 items-center justify-center rounded-[16px] bg-[#f3f3f3] shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff]">
          {icon}
        </View>
        <Text className="text-center text-[13px] font-bold text-[#2d2d2d]">
          {label}
        </Text>
        <Text className="mt-1 text-center text-[10px] text-[#8c8c8c]">
          {subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function AmountPill({
  label,
  active = false,
  compact = false,
}: {
  label: string;
  active?: boolean;
  compact?: boolean;
}) {
  return (
    <TouchableOpacity
      className={`items-center justify-center rounded-full shadow-[6px_6px_12px_#d9d9d9,-6px_-6px_12px_#ffffff] ${
        active ? "bg-[#f4c61f]" : "bg-[#f3f3f3]"
      } ${compact ? "w-[16%]" : "w-[25%]"} h-10`}
    >
      <Text
        className={`text-[12px] font-semibold ${
          active ? "text-[#222]" : "text-[#2d2d2d]"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
