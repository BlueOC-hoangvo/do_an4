// src/features/auth/types.ts
export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
export interface RegisterDTO {
  username: string;
  password: string;
  role?: "admin" | "user"; // Mặc định là user
}

export interface LoginDTO {
  username: string;
  password: string;
}
