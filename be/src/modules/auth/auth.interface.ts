export interface RegisterDTO {
  username: string;
  password: string;
  role?: "admin" | "user"; // Mặc định là user
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface TokenPayload {
  id: number;
  username: string;
  role: string;
}
