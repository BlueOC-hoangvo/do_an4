// Định nghĩa cấu trúc sản phẩm dựa trên bảng `products`
export interface Product {
  id: number;
  product_name: string;
  price: number;
  image_url: string;
  description?: string;
  // Các trường quan hệ (đã join bảng hoặc lấy id)
  brand_id?: number;
  category_id?: number;
  brand_name?: string; // Mock thêm tên brand để hiển thị cho đẹp
  status: number;
}
