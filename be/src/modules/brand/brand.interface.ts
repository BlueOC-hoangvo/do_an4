import { RowDataPacket } from "mysql2";

// Định nghĩa cấu trúc của 1 Brand trong DB
export interface Brand extends RowDataPacket {
  id: number;
  name: string;
  status: number;
  created_at?: Date;
}

// DTO (Data Transfer Object) cho việc tạo/sửa
export interface CreateBrandDTO {
  name: string;
  status?: number;
}

export interface UpdateBrandDTO {
  name?: string;
  status?: number;
}
