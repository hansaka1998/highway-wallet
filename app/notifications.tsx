import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    where,
    writeBatch
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";
import { auth, db } from "../firebaseConfig";

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    // 1. Firebase එකෙන් මේ User ට අදාළ notifications real-time ලබාගැනීම
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. සියල්ල කියවූ බවට සලකුණු කිරීම (Mark all as read)
  const markAllAsRead = async () => {
    const batch = writeBatch(db);
    notifications.forEach((n) => {
      if (!n.read) {
        const ref = doc(db, "notifications", n.id);
        batch.update(ref, { read: true });
      }
    });
    await batch.commit();
  };

  const renderItem = ({ item }: { item: any }) => (
    <Pressable
      className={`mb-3 flex-row items-start rounded-[25px] border border-white/5 p-5 ${
        item.read ? "bg-white/5" : "bg-white/10"
      }`}
    >
      <View
        className={`h-12 w-12 items-center justify-center rounded-2xl ${
          item.type === "payment"
            ? "bg-green-500/10"
            : item.type === "alert"
              ? "bg-red-500/10"
              : "bg-blue-500/10"
        }`}
      >
        <MaterialCommunityIcons
          name={
            item.type === "payment"
              ? "check-circle-outline"
              : item.type === "alert"
                ? "alert-octagon-outline"
                : "shield-check-outline"
          }
          size={24}
          color={
            item.type === "payment"
              ? "#22c55e"
              : item.type === "alert"
                ? "#ef4444"
                : "#3b82f6"
          }
        />
      </View>

      <View className="ml-4 flex-1">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-sm font-bold ${item.read ? "text-white/60" : "text-white"}`}
          >
            {item.title}
          </Text>
          {!item.read && <View className="h-2 w-2 rounded-full bg-[#FF3B30]" />}
        </View>
        <Text className="mt-1 text-xs leading-5 text-white/40">
          {item.body}
        </Text>
        <Text className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
          {item.createdAt?.toDate
            ? item.createdAt.toDate().toLocaleTimeString()
            : "Just now"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-[#0b0b0f]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pb-6 pt-14">
        <Pressable
          onPress={() => router.push("/profile")}
          className="h-10 w-10 items-center justify-center rounded-full bg-white/5"
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </Pressable>
        <Text className="text-lg font-bold uppercase tracking-widest text-white">
          Notifications
        </Text>
        <Pressable onPress={markAllAsRead}>
          <Text className="text-[10px] font-bold uppercase tracking-widest text-[#FF3B30]">
            Mark Read
          </Text>
        </Pressable>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#FF3B30" />
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerClassName="px-6 pt-2 pb-20"
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Ionicons
                name="notifications-off-outline"
                size={60}
                color="white"
                style={{ opacity: 0.1 }}
              />
              <Text className="mt-4 text-center font-bold uppercase tracking-widest text-white/20">
                No notifications yet
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
