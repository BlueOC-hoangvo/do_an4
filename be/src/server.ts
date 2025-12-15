// 1. QUAN TRỌNG: Import app từ file app.ts (nơi chứa routes), KHÔNG tạo app mới
import app from "./app";
import { checkConnection } from "./common/config/db";
import dotenv from "dotenv";

// Load biến môi trường
dotenv.config();

// Ép kiểu số để tránh lỗi TypeScript
const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
  // 1. Kiểm tra kết nối DB trước
  await checkConnection();

  // 2. Lắng nghe trên '0.0.0.0' để mở cửa cho điện thoại vào
  app.listen(port, "0.0.0.0", () => {
    console.log(
      `🚀 Server đang chạy tại http://${process.env.DB_HOST}:${port}`
    );
    // Dòng này để bạn dễ copy IP cho vào file .env của Frontend
    console.log(`📱 IP cho Frontend: http://<IP_MAY_TINH_CUA_BAN>:${port}`);
  });
};

startServer();
