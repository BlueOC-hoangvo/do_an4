import db from "../../common/config/db";
import {
  StrapType,
  CreateStrapTypeDTO,
  UpdateStrapTypeDTO,
} from "./straptype.interface";
import { ResultSetHeader } from "mysql2";

export class StrapTypeService {
  // Lấy tất cả
  static async getAll() {
    const [rows] = await db.query<StrapType[]>("SELECT * FROM strap_types");
    return rows;
  }

  // Lấy theo trạng thái (cho FE hiển thị)
  static async getByStatus(status: number) {
    const [rows] = await db.query<StrapType[]>(
      "SELECT * FROM strap_types WHERE status = ?",
      [status]
    );
    return rows;
  }

  // Lấy chi tiết
  static async getById(id: number) {
    const [rows] = await db.query<StrapType[]>(
      "SELECT * FROM strap_types WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  // Tạo mới
  static async create(data: CreateStrapTypeDTO) {
    const { name, status = 1 } = data;
    // Check trùng tên
    const [exist] = await db.query<StrapType[]>(
      "SELECT id FROM strap_types WHERE name = ?",
      [name]
    );
    if (exist.length > 0) throw new Error("Tên loại dây đã tồn tại");

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO strap_types (name, status) VALUES (?, ?)",
      [name, status]
    );
    return { id: result.insertId, ...data };
  }

  // Cập nhật
  static async update(id: number, data: UpdateStrapTypeDTO) {
    // Check tồn tại
    const current = await this.getById(id);
    if (!current) throw new Error("Strap type not found");

    const { name, status } = data;

    // Nếu đổi tên thì phải check trùng (trừ chính nó)
    if (name && name !== current.name) {
      const [exist] = await db.query<StrapType[]>(
        "SELECT id FROM strap_types WHERE name = ? AND id != ?",
        [name, id]
      );
      if (exist.length > 0) throw new Error("Tên loại dây đã tồn tại");
    }

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE strap_types SET name = COALESCE(?, name), status = COALESCE(?, status) WHERE id = ?",
      [name, status, id]
    );

    return { message: "Cập nhật thành công" };
  }

  // Xóa
  static async delete(id: number) {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM strap_types WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) throw new Error("Strap type not found");
    return { message: "Xóa thành công" };
  }
}
