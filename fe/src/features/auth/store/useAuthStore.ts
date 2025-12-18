// src/features/auth/store/useAuthStore.ts
import { create } from "zustand";
import { authApi } from "../api/authApi";
import { storage } from "@/src/libs/storage";
import { AuthState, LoginResponse } from "../types";
import { router } from "expo-router";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Mặc định true để check token khi app mở

  login: async (data) => {
    try {
      const res: LoginResponse = await authApi.login(data);

      // Lưu tokens
      await storage.setToken(res.accessToken);
      await storage.setRefreshToken(res.refreshToken);

      set({ user: res.user, isAuthenticated: true });
      router.replace("/(tabs)/home"); // Chuyển hướng
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout(); // Gọi BE để xóa token trong DB
    } catch (error) {
      console.warn("Logout API failed, forcing local logout");
    } finally {
      // Xóa local bất kể API thành công hay thất bại
      await storage.clearTokens();
      set({ user: null, isAuthenticated: false });
      router.replace("/login");
    }
  },

  checkAuth: async () => {
    try {
      const token = await storage.getToken();
      if (!token) {
        set({ isLoading: false, isAuthenticated: false });
        return;
      }

      // Lấy thông tin user từ token hiện tại
      const user = await authApi.getMe();
      set({ user, isAuthenticated: true, isLoading: false });
      router.replace("/(tabs)/home");
    } catch (error) {
      // Token hết hạn hoặc không hợp lệ
      await storage.clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
