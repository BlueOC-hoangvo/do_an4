import { Tabs } from "expo-router";
import React from "react";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons"; // Thêm import

import { HapticTab } from "@/src/shared/components/haptic-tab";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/shared/components/header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <MaterialIcons
                name={focused ? "home" : "home-filled"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="explore" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wishlist",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="favorite" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
