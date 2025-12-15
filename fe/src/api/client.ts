// src/api/client.ts
import axios from "axios";
import { Env } from "../config/env";
// Thay đổi IP này theo IP máy tính của bạn (VD: 192.168.1.15)
// Kiểm tra log ở backend server.ts để lấy IP chính xác
const BASE_URL = Env.API_URL;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default client;
