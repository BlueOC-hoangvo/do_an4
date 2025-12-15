// src/libs/storage.ts
import * as SecureStore from "expo-secure-store";

export const storage = {
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Lỗi khi lưu token:", error);
    }
  },

  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
      return null;
    }
  },

  async removeToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("Lỗi khi xóa token:", error);
    }
  },
};
