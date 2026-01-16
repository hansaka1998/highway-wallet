import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useTransactions } from '../contexts/TransactionContext';
import { useWallet } from '../contexts/WalletContext';

// Reusable component for the Quick Top Up buttons
const AmountButton = ({ amount, selected, onPress }: any) => (
  <Pressable
    onPress={onPress}
    className={`w-[48%] h-16 rounded-3xl items-center justify-center mb-4 border ${selected ? 'border-red-500 bg-white/10' : 'border-white/10 bg-white/5'}`}
  >
    <Text className="text-white font-bold text-base">RS. {amount}</Text>
  </Pressable>
);

// Reusable component for Payment Methods
const PaymentMethod = ({ title, sub, icon, iconType = "MaterialCommunityIcons", onPress }: any) => (
  <LinearGradient
    colors={["#FF4133", "#7A003C", "#FF4133"]}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    className="rounded-[30px] p-[1.5px] mb-4"
  >
    <Pressable onPress={onPress} className="bg-[#0F0F12] rounded-[28px] flex-row items-center px-6 py-4">
      <View className="bg-white/5 h-12 w-12 rounded-full items-center justify-center mr-4">
        {iconType === "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons name={icon} size={24} color="#FF3B30" />
        ) : (
          <Ionicons name={icon} size={24} color="#FF3B30" />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-white font-bold text-sm uppercase tracking-wider">{title}</Text>
        <Text className="text-white/50 text-[10px] mt-0.5">{sub}</Text>
      </View>
    </Pressable>
  </LinearGradient>
);

const TopUpScreen = () => {
  const [selectedAmount, setSelectedAmount] = useState('0');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const router = useRouter();
  const { balance, addAmount } = useWallet();
  const { addTransaction } = useTransactions();

  const handleProceedToPayment = async () => {
    const amount = selectedAmount === 'Custom Amount' ? parseFloat(customAmount.replace(/,/g, '')) : parseFloat(selectedAmount.replace(/,/g, ''));

    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please select or enter a valid amount');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method');
      return;
    }

    try {
      // Show processing alert
      Alert.alert('Processing Payment', `Processing RS. ${amount.toFixed(2)} via ${selectedPaymentMethod}...`);

      // Update wallet balance in Firebase
      const userId = 'demo-user'; // In real app, get from auth
      await updateDoc(doc(db, "users", userId), {
        walletBalance: increment(amount)
      });

      // Update local wallet balance
      addAmount(amount);

      // Add transaction to history
      addTransaction({
        type: 'topup',
        amount: amount,
        description: `Top-up via ${selectedPaymentMethod}`,
      });

      // Add transaction to Firebase
      await addDoc(collection(db, "transactions"), {
        userId: userId,
        type: 'topup',
        amount: amount,
        description: `Top-up via ${selectedPaymentMethod}`,
        paymentMethod: selectedPaymentMethod,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date(),
      });

      Alert.alert(
        'Payment Successful!',
        `RS. ${amount.toFixed(2)} has been added to your wallet.`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Payment Error', 'An error occurred while processing your payment. Please try again.');
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="pt-14 px-6 flex-row items-center">
        <Pressable className="mr-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <Text className="text-white font-bold text-xl tracking-widest uppercase flex-1 text-center mr-8">Top Up Wallet</Text>
      </View>

      <ScrollView contentContainerClassName="px-6 pt-8 pb-32">
        {/* Current Balance Card */}
        <LinearGradient
          colors={["#FF4133", "#7A003C", "#FF4133"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="rounded-[35px] p-[2px] mb-10"
        >
          <View className="bg-[#0F0F12] rounded-[33px] p-8 items-center">
            <View className="flex-row items-center mb-2">
              <MaterialCommunityIcons name="wallet-outline" size={18} color="#FF3B30" />
              <Text className="text-white/60 font-bold ml-2 text-xs uppercase tracking-[2px]">Current Balance</Text>
            </View>
            <Text className="text-white text-4xl font-black">LKR {balance.toFixed(2)}</Text>
          </View>
        </LinearGradient>

        {/* Quick Top Up Section */}
        <Text className="text-white font-bold tracking-[3px] mb-6 text-sm uppercase">Quick Top Up</Text>
        <View className="flex-row flex-wrap justify-between">
          {['500', '1,000', '2,000', '5,000'].map((amt) => (
            <AmountButton
              key={amt}
              amount={amt}
              selected={selectedAmount === amt}
              onPress={() => {
                setSelectedAmount(amt);
                setCustomAmount('');
              }}
            />
          ))}
        </View>

        {/* Custom Amount Button */}
        <Pressable
          onPress={() => setSelectedAmount('Custom Amount')}
          className={`w-full h-16 rounded-full flex-row items-center justify-center mb-10 border ${selectedAmount === 'Custom Amount' ? 'border-red-500 bg-white/10' : 'border-white/10 bg-white/5'}`}
        >
          <MaterialCommunityIcons name="cash-plus" size={20} color="#FF3B30" className="mr-2" />
          <Text className="text-white/70 font-bold tracking-widest uppercase text-xs mr-4">Custom Amount</Text>
          {selectedAmount === 'Custom Amount' && (
            <TextInput
              value={customAmount}
              onChangeText={setCustomAmount}
              placeholder="Enter amount"
              placeholderTextColor="#ffffff40"
              keyboardType="numeric"
              className="flex-1 text-white text-base"
            />
          )}
        </Pressable>

        {/* Payment Methods Section */}
        <Text className="text-white font-bold tracking-[3px] mb-6 text-sm uppercase">Payment Methods</Text>
        <PaymentMethod
          title="Credit/Debit Card"
          sub="Visa, MasterCard, American Express"
          icon="credit-card-outline"
          onPress={() => handlePaymentMethodSelect('Credit/Debit Card')}
        />
        <PaymentMethod
          title="Bank Transfer"
          sub="Direct bank transfer or online banking"
          icon="bank-outline"
          onPress={() => handlePaymentMethodSelect('Bank Transfer')}
        />
        <PaymentMethod
          title="Digital Wallet"
          sub="eZ Cash, mCash, PayHere, Frimi"
          icon="cellphone-check"
          onPress={() => handlePaymentMethodSelect('Digital Wallet')}
        />

        {/* Proceed Button */}
        <Pressable onPress={handleProceedToPayment} className="mt-6 mb-10">
          <LinearGradient
            colors={['#2D2D35', '#1A1A1E']}
            className="h-16 rounded-full items-center justify-center flex-row border border-white/10"
          >
            <MaterialCommunityIcons name="shield-check-outline" size={20} color="#FF3B30" className="mr-2" />
            <Text className="text-white font-black tracking-[4px] uppercase text-sm">Proceed to Payment</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default TopUpScreen;