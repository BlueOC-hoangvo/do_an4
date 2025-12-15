import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  Stack,
  useRouter,
  useSegments,
  useRootNavigationState,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { useAuthStore } from "@/src/features/auth/store/useAuthStore";

// 1. Giữ Splash Screen để che quá trình load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // --- LOGIC AUTHENTICATION ---
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // State riêng để kiểm soát việc đã sẵn sàng ẩn Splash chưa
  const [isReady, setIsReady] = useState(false);

  // 1. Kiểm tra Auth khi mở app
  useEffect(() => {
    const initApp = async () => {
      await checkAuth();
      setIsReady(true); // Đánh dấu là đã check xong
    };
    initApp();
  }, []);

  // 2. Điều hướng bảo vệ (Chỉ chạy khi navigation đã mount + đã check auth xong)
  useEffect(() => {
    if (!navigationState?.key || !isReady) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (isAuthenticated && !inAuthGroup) {
      // Đã login -> Vào trong
      router.replace("/(tabs)");
    } else if (!isAuthenticated && inAuthGroup) {
      // Chưa login -> Ra ngoài
      router.replace("/login");
    }
  }, [isAuthenticated, segments, navigationState?.key, isReady]);

  // 3. Ẩn Splash Screen khi mọi thứ đã sẵn sàng
  useEffect(() => {
    if (isReady && navigationState?.key) {
      SplashScreen.hideAsync();
    }
  }, [isReady, navigationState?.key]);

  // --- QUAN TRỌNG: LUÔN RENDER STACK, KHÔNG RETURN NULL ---
  // Nếu return null ở đây sẽ gây lỗi "Attempted to navigate before mounting..."
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
