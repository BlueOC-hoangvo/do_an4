import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuthStore } from "@/src/features/auth/store/useAuthStore";
import { View, ActivityIndicator } from "react-native";
import "../global.css"; // <--- THÊM DÒNG NÀY ĐẦU TIÊN
export default function RootLayout() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const segments = useSegments(); // Lấy thông tin user đang đứng ở đâu (ví dụ: ['(tabs)', 'explore'])
  const router = useRouter();

  // 1. Kiểm tra token khi App vừa mở
  useEffect(() => {
    checkAuth();
  }, []);

  // 2. Logic "Gác cổng" (Protect Route)
  useEffect(() => {
    // Nếu đang load (đang check token trong storage) thì chưa làm gì cả
    if (isLoading) return;

    // Kiểm tra xem user có đang ở trong nhóm route cần bảo vệ không
    // Ở đây giả sử thư mục '(tabs)' là nơi cần đăng nhập mới được vào
    const inAuthGroup = segments[0] === "(tabs)";

    if (!isAuthenticated && inAuthGroup) {
      // TRƯỜNG HỢP 1: Chưa đăng nhập mà cố vào trang nội bộ -> Đá về Login
      // Dùng replace để user không thể bấm nút Back quay lại trang cũ
      router.replace("/login");
    } else if (isAuthenticated && segments[0] === "login") {
      // TRƯỜNG HỢP 2: Đã đăng nhập rồi mà lại lạc vào trang Login -> Đá vào trong
      router.replace("/(tabs)/home");
    }
  }, [isAuthenticated, isLoading, segments]);

  // 3. Màn hình chờ (Splash Screen giả) khi đang check token
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 4. Định nghĩa cấu trúc Stack navigation
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: true,
          title: "Chi tiết sản phẩm",
          headerBackTitle: "Trở lại",
        }}
      />

      <Stack.Screen
        name="cart"
        options={{
          headerShown: true,
          title: "Giỏ hàng",
          presentation: "modal", // Hoặc 'card' tùy sở thích
        }}
      />

      <Stack.Screen
        name="search"
        options={{
          headerShown: false,
          animation: "fade_from_bottom",
        }}
      />

      {/* 4. Checkout Flow */}
      <Stack.Screen name="(checkout)" />

      {/* 5. Modal & Not Found */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Thông báo",
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
