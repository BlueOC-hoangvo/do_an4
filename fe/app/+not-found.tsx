import { Button, View, Text } from "react-native";
import { useAuthStore } from "@/src/features/auth/store/useAuthStore";

export default function NotfoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Xin chào,đây là trang notfound</Text>
    </View>
  );
}
