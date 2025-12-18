import { Product } from "../features/product/types";

// Hình ảnh demo (Lấy link ảnh đồng hồ thật hoặc placeholder)
const IMG_ROLEX =
  "https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_1280.jpg";
const IMG_CASIO =
  "https://cdn.pixabay.com/photo/2014/07/31/23/00/wristwatch-407096_1280.jpg";
const IMG_SEIKO =
  "https://cdn.pixabay.com/photo/2013/07/12/12/59/wristwatch-146698_1280.png";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    product_name: "Rolex Submariner Date",
    price: 350000000,
    image_url: IMG_ROLEX,
    brand_id: 1,
    brand_name: "Rolex",
    category_id: 1,
    description: "Đồng hồ lặn kinh điển, mặt kính Sapphire chống trầy.",
    status: 1,
  },
  {
    id: 2,
    product_name: "Casio G-Shock GA-2100",
    price: 3500000,
    image_url: IMG_CASIO,
    brand_id: 2,
    brand_name: "Casio",
    category_id: 1,
    description: "Thiết kế bát giác, chống sốc cực tốt, chống nước 20ATM.",
    status: 1,
  },
  {
    id: 3,
    product_name: "Seiko 5 Sports Automatic",
    price: 6800000,
    image_url: IMG_SEIKO,
    brand_id: 3,
    brand_name: "Seiko",
    category_id: 1,
    description: "Máy Automatic bền bỉ, mặt số xanh quân đội.",
    status: 1,
  },
  {
    id: 4,
    product_name: "Orient Bambino Gen 2",
    price: 5200000,
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Orient_Bambino_watch.jpg/640px-Orient_Bambino_watch.jpg",
    brand_id: 4,
    brand_name: "Orient",
    category_id: 2,
    description: "Kính cong vòm cổ điển, dây da sang trọng.",
    status: 1,
  },
  {
    id: 5,
    product_name: "Apple Watch Ultra 2",
    price: 21990000,
    image_url:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60",
    brand_id: 5,
    brand_name: "Apple",
    category_id: 3,
    description: "Smartwatch cao cấp nhất, vỏ Titan.",
    status: 1,
  },
  {
    id: 6,
    product_name: "Hublot Classic Fusion",
    price: 180000000,
    image_url:
      "https://images.unsplash.com/photo-1619134778706-c27533dbdcc2?w=500&auto=format&fit=crop&q=60",
    brand_id: 6,
    brand_name: "Hublot",
    category_id: 1,
    description: "Sự kết hợp giữa cao su và vàng hồng 18k.",
    status: 1,
  },
];

export const MOCK_BANNERS = [
  "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1000&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1434056838489-2930296898d3?w=1000&auto=format&fit=crop&q=80",
];
