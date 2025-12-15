import db from "../../common/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // Dùng để băm Refresh Token
import { LoginDTO, RegisterDTO, TokenPayload } from "./auth.interface";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export class AuthService {
  // Hàm phụ: Băm token (SHA256)
  private static hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  // 1. Đăng ký
  static async register(data: RegisterDTO) {
    const { username, password, role = "user" } = data;

    // Kiểm tra user tồn tại
    const [existingUsers] = await db.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existingUsers.length > 0) throw new Error("Username đã tồn tại");

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Lưu vào DB
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO users (username, password, role, status) VALUES (?, ?, ?, 1)",
      [username, hashedPassword, role]
    );

    return { message: "Đăng ký thành công", userId: result.insertId };
  }

  // 2. Đăng nhập
  static async login(data: LoginDTO) {
    const { username, password } = data;

    // Tìm user
    const [users] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ? AND status = 1",
      [username]
    );
    if (users.length === 0)
      throw new Error("Tài khoản không tồn tại hoặc bị khóa");

    const user = users[0];

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mật khẩu sai");

    // Tạo Tokens
    const payload: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // Access Token: Sống 1 giờ (Lưu ở RAM phía Client)
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // Refresh Token: Sống 7 ngày (Lưu ở SecureStore phía Client)
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // BẢO MẬT: Chỉ lưu bản HASH của Refresh Token vào DB
    const hashedRefreshToken = this.hashToken(refreshToken);
    await db.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      hashedRefreshToken,
      user.id,
    ]);

    return {
      message: "Đăng nhập thành công",
      accessToken,
      refreshToken, // Trả token gốc về cho Client lưu SecureStore
      user: { id: user.id, username: user.username, role: user.role },
    };
  }

  // 3. Cấp lại Token mới (Refresh)
  static async refreshToken(token: string) {
    if (!token) throw new Error("Thiếu Refresh Token");

    // Verify chữ ký token gốc
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err) {
      throw new Error("Refresh Token hết hạn hoặc không hợp lệ");
    }

    // Băm token client gửi lên để so sánh với DB
    const hashedRefreshToken = this.hashToken(token);

    // Tìm user có hash token khớp
    const [users] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ? AND refresh_token = ?",
      [decoded.id, hashedRefreshToken]
    );

    if (users.length === 0) {
      // Token hợp lệ chữ ký nhưng không khớp DB -> Có thể token cũ đã bị hủy hoặc token ăn trộm
      throw new Error("Refresh Token không tồn tại hoặc đã bị thu hồi");
    }

    const user = users[0];

    // Cấp Access Token MỚI
    const payload: TokenPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return { accessToken: newAccessToken };
  }

  // 4. Đăng xuất
  static async logout(userId: number) {
    // Xóa refresh token trong DB -> Token ở client sẽ vô hiệu lực ngay lập tức
    await db.query("UPDATE users SET refresh_token = NULL WHERE id = ?", [
      userId,
    ]);
    return { message: "Đăng xuất thành công" };
  }
}
