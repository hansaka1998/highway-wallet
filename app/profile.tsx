import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { useWallet } from "../contexts/WalletContext";
import { auth, db } from "../firebaseConfig";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function ProfileScreen() {
  const router = useRouter();
  const { balance } = useWallet();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    emergencyContact: "",
    profileImage: DEFAULT_AVATAR,
  });

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setProfile({
          fullName: data.fullName || "",
          email: data.email || "",
          emergencyContact: data["phone-number"] || data.emergencyContact || "",
          profileImage: data.profileImage || DEFAULT_AVATAR,
        });
      }
    });
    return () => unsub();
  }, []);

  const pickImage = async () => {
    if (!isEditing) return;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setProfile({ ...profile, profileImage: result.assets[0].uri });
    }
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    try {
      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, {
        fullName: profile.fullName,
        "phone-number": profile.emergencyContact,
        profileImage: profile.profileImage,
      });
      setIsEditing(false);
      Alert.alert("Success", "Profile Updated!");
    } catch (error) {
      console.error("Profile update error:", error);
      Alert.alert("Error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (e: any) {
      Alert.alert("Logout Failed", e.message);
    }
  };

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-4 pt-14">
        <Pressable
          onPress={() => router.replace("/")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/5"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-black uppercase tracking-widest text-white">
          My Profile
        </Text>
        <Pressable
          onPress={() => (isEditing ? handleUpdate() : setIsEditing(true))}
          className={`rounded-2xl px-5 py-2 ${isEditing ? "bg-green-600" : "bg-[#FF3B30]"}`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-[10px] font-bold tracking-widest text-white">
              {isEditing ? "SAVE" : "EDIT"}
            </Text>
          )}
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-6 pt-4 pb-20"
      >
        {/* Profile Image Section */}
        <View className="mb-8 items-center">
          <Pressable onPress={pickImage} className="relative">
            <View className="h-28 w-28 overflow-hidden rounded-full border-2 border-white/10">
              <Image
                source={{ uri: profile.profileImage }}
                className="h-full w-full"
              />
            </View>
            {isEditing && (
              <View className="absolute bottom-0 right-0 rounded-full border-2 border-[#0b0b0f] bg-[#FF3B30] p-2">
                <MaterialCommunityIcons name="camera" size={16} color="white" />
              </View>
            )}
          </Pressable>
          <Text className="mt-4 text-2xl font-black text-white">
            {profile.fullName || "User"}
          </Text>
          <Text className="font-medium lowercase italic text-white/40">
            {profile.email}
          </Text>
        </View>

        {/* Balance Card */}
        <View className="mb-8 flex-row items-center justify-between rounded-[30px] border border-white/10 bg-white/5 p-6">
          <View>
            <Text className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Available Balance
            </Text>
            <Text className="mt-1 text-2xl font-black text-white">
              RS {Number(balance).toFixed(2)}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/topup")}
            className="h-12 w-12 items-center justify-center rounded-2xl bg-[#FF3B30]/20"
          >
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color="#FF3B30"
            />
          </Pressable>
        </View>

        {/* Account Details */}
        <View className="mb-6 rounded-[30px] border border-white/10 bg-white/5 p-6">
          <Text className="mb-6 text-[10px] font-black uppercase tracking-[3px] text-[#FF3B30]">
            Personal Information
          </Text>

          <View className="mb-6">
            <Text className="mb-2 text-[10px] font-bold uppercase text-white/20">
              Display Name
            </Text>
            {isEditing ? (
              <TextInput
                className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-white"
                value={profile.fullName}
                onChangeText={(t) => setProfile({ ...profile, fullName: t })}
              />
            ) : (
              <Text className="text-base font-bold text-white">
                {profile.fullName || "-"}
              </Text>
            )}
          </View>

          <View className="mb-2">
            <Text className="mb-2 text-[10px] font-bold uppercase text-white/20">
              Emergency Contact (SOS)
            </Text>
            {isEditing ? (
              <TextInput
                className="rounded-2xl border border-[#FF3B30]/20 bg-white/5 p-4 font-black text-[#FF3B30]"
                value={profile.emergencyContact}
                keyboardType="phone-pad"
                onChangeText={(t) =>
                  setProfile({ ...profile, emergencyContact: t })
                }
              />
            ) : (
              <Text className="text-base font-black text-[#FF3B30]">
                {profile.emergencyContact || "-"}
              </Text>
            )}
          </View>
        </View>

        {/* Settings & Privacy */}
        <Text className="mb-4 ml-4 text-[10px] font-black uppercase tracking-[3px] text-white/30">
          Settings
        </Text>

        <View className="space-y-3">
          <Pressable
            onPress={() => router.push("/notifications")}
            className="flex-row items-center rounded-[25px] border border-white/5 bg-white/5 p-5"
          >
            <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
              <Ionicons name="notifications" size={20} color="#3b82f6" />
            </View>
            <Text className="ml-4 flex-1 font-bold text-white">
              Notifications
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="rgba(255,255,255,0.2)"
            />
          </Pressable>
        </View>

        {/* Logout */}
        <Pressable onPress={handleLogout} className="mb-10 mt-12 items-center">
          <Text className="text-[11px] font-black uppercase tracking-widest text-[#FF3B30]">
            Logout Account
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
