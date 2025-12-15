// 📂 File: src/types/index.ts

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  password: string;
  role?: "admin" | "user"; // Backend của bạn có role optional
}

// Các types chung khác của dự án có thể để ở dưới...
