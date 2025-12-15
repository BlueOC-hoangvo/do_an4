import db from "../../common/config/db";
import { Brand, CreateBrandDTO, UpdateBrandDTO } from "./brand.interface";
import { ResultSetHeader } from "mysql2";

export class BrandService {
  // 1. Lấy tất cả
  static async getAll() {
    const [rows] = await db.query<Brand[]>("SELECT * FROM brands");
    return rows;
  }

  // 2. Lấy theo ID
  static async getById(id: number) {
    const [rows] = await db.query<Brand[]>(
      "SELECT * FROM brands WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  // 3. Lấy theo Status (cho Frontend)
  static async getAllByStatus(status: number) {
    const [rows] = await db.query<Brand[]>(
      "SELECT * FROM brands WHERE status = ?",
      [status]
    );
    return rows;
  }

  // 4. Tạo mới
  static async create(data: CreateBrandDTO) {
    const { name, status = 1 } = data;
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO brands (name, status) VALUES (?, ?)",
      [name, status]
    );
    return { id: result.insertId, ...data };
  }

  // 5. Cập nhật (Có Transaction phức tạp)
  static async update(id: number, data: UpdateBrandDTO) {
    const connection = await db.getConnection(); // Lấy kết nối riêng để chạy Transaction
    try {
      await connection.beginTransaction(); // Bắt đầu Transaction

      // Cập nhật bảng brands
      const [updateRes] = await connection.query<ResultSetHeader>(
        "UPDATE brands SET name = ?, status = ? WHERE id = ?",
        [data.name, data.status, id]
      );

      if (updateRes.affectedRows === 0) {
        throw new Error("Brand not found"); // Tự ném lỗi để nhảy xuống catch
      }

      let productsAffected = 0;

      // Logic cũ: Nếu status = 0 (Ẩn) -> Cập nhật tất cả sản phẩm thuộc brand này thành ẩn luôn
      if (data.status === 0) {
        const [prodRes] = await connection.query<ResultSetHeader>(
          "UPDATE products SET status = 0 WHERE brand_id = ?",
          [id]
        );
        productsAffected = prodRes.affectedRows;
      }

      await connection.commit(); // Thành công thì lưu lại

      return {
        message: `Cập nhật thương hiệu id = ${id} thành công`,
        productsAffected,
      };
    } catch (error) {
      await connection.rollback(); // Có lỗi thì hoàn tác
      throw error;
    } finally {
      connection.release(); // Trả kết nối về pool
    }
  }

  // 6. Xóa
  static async delete(id: number) {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM brands WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Brand not found");
    }
    return { message: `Xóa thương hiệu id = ${id} thành công` };
  }
}
