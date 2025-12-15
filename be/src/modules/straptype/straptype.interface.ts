import { RowDataPacket } from "mysql2";

export interface StrapType extends RowDataPacket {
  id: number;
  name: string;
  status: number;
  created_at?: Date;
}

export interface CreateStrapTypeDTO {
  name: string;
  status?: number;
}

export interface UpdateStrapTypeDTO {
  name?: string;
  status?: number;
}
