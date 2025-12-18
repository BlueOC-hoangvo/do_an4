// src/features/auth/api/authApi.ts
import client from "@/src/api/client";
import { LoginDTO, RegisterDTO } from "../types"; // Bạn cần tạo interface này ở types.ts tương tự BE
import { LoginResponse, User } from "../types";

export const authApi = {
  login: async (data: LoginDTO) => {
    const response = await client.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterDTO) => {
    const response = await client.post("/auth/register", data);
    return response.data;
  },

  logout: async () => {
    return await client.post("/auth/logout");
  },

  getMe: async () => {
    const response = await client.get<{ user: User }>("/auth/me");
    return response.data.user;
  },
};
