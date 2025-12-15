// src/features/auth/api/authApi.ts
import client from "@/src/api/client";
import { LoginDTO } from "../types"; // Hoặc define LoginDTO tại đây
import { LoginResponse } from "../types";

export const authApi = {
  login: async (data: any): Promise<LoginResponse> => {
    const response = await client.post("/auth/login", data);
    return response.data;
  },

  // Có thể thêm register, logout, refresh-token sau này
};
