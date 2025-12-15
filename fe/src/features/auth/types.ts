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
export interface LoginDTO {
  username: string;
  password: string;
}
