// src/features/auth/store/useAuthStore.ts
import { create } from "zustand";
import { authApi } from "../api/authApi";
import { storage } from "@/src/libs/storage";
import { User } from "../types";
import { router } from "expo-router";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // Hàm để tự động login khi mở app
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      // 1. Gọi API Login
      const data = await authApi.login(payload);

      // 2. Lưu token vào SecureStore
      await storage.saveToken("accessToken", data.accessToken);
      await storage.saveToken("refreshToken", data.refreshToken);

      // 3. Cập nhật State
      set({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });

      // 4. Điều hướng vào trang chính
      router.replace("/(tabs)");
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Đăng nhập thất bại",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    // Xóa token và reset state
    await storage.removeToken("accessToken");
    await storage.removeToken("refreshToken");
    set({ user: null, isAuthenticated: false });
    router.replace("/login");
  },

  checkAuth: async () => {
    // Logic kiểm tra xem người dùng đã đăng nhập chưa khi mở app (sẽ làm kỹ hơn ở phần Refresh Token)
    const token = await storage.getToken("accessToken");
    if (token) {
      set({ isAuthenticated: true });
      // TODO: Nên gọi thêm API /me để lấy thông tin user mới nhất
    }
  },
}));
