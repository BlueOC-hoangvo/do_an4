import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuthStore } from "../store/useAuthStore"; // Import từ store cùng feature

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
    }

    setLoading(true);
    try {
      await login({ username, password });
      // Không cần navigate, store/layout tự handle
    } catch (error: any) {
      Alert.alert(
        "Lỗi đăng nhập",
        error.response?.data?.message || "Có lỗi xảy ra"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Đăng nhập" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
