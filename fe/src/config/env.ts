// FILE: src/config/env.ts

// Kiểm tra xem biến có tồn tại không, nếu không thì báo lỗi ngay lập tức
// Giúp tránh lỗi "undefined" khó chịu khi chạy app
const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("❌ Thiếu biến môi trường: EXPO_PUBLIC_API_URL");
}

export const Env = {
  API_URL: API_URL,

  TIMEOUT: 15000,
};
