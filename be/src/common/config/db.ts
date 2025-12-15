import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load biến môi trường từ file .env
dotenv.config();

// Tạo Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "watch_store_db",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Số lượng kết nối tối đa cùng lúc
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Hàm kiểm tra kết nối (Tuỳ chọn: dùng để chạy thử khi start server)
export const checkConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Kết nối MySQL thành công!");
    connection.release(); // Quan trọng: Phải trả kết nối về pool sau khi dùng
  } catch (error) {
    console.error("❌ Lỗi kết nối MySQL:", error);
    process.exit(1); // Dừng app nếu không nối được DB
  }
};

export default db;
