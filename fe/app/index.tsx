import { Redirect } from "expo-router";

export default function Index() {
  // Khi mở app, tự động chuyển hướng vào '/login' hoặc '/(tabs)/home'
  // RootLayout sẽ lo việc chặn lại nếu chưa đăng nhập.
  return <Redirect href="/(tabs)/home" />;
}
