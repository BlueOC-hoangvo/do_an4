// src/api/client.ts
import axios from "axios";
import { Env } from "@/src/config/env";
import { storage } from "@/src/libs/storage";

const client = axios.create({
  baseURL: Env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Request Interceptor: Gắn Access Token vào mọi request
client.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Response Interceptor: Xử lý 401 & Refresh Token
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa từng thử retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã retry để tránh vòng lặp vô hạn

      try {
        const refreshToken = await storage.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // Gọi API refresh token (Lưu ý: Không dùng instance 'client' để tránh loop interceptor nếu API này cũng fail)
        const response = await axios.post(`${Env.API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Lưu token mới
        await storage.setToken(accessToken);

        // Gắn token mới vào header request cũ và gọi lại
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return client(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng fail (hết hạn 7 ngày hoặc bị thu hồi) -> Logout
        await storage.clearTokens();
        // Có thể bắn event hoặc dùng store để điều hướng về Login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
