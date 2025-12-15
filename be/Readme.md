# 1. Tạo thư mục tổng dự án backend

md backend-ecommerce
cd backend-ecommerce

# 2. Khởi tạo file package.json

npm init -y

# 3. Cài đặt các thư viện chính (Production)

npm install express mongoose dotenv cors helmet jsonwebtoken bcryptjs zod

# 4. Cài đặt các thư viện hỗ trợ TypeScript (Dev)

npm install -D typescript ts-node nodemon @types/node @types/express @types/mongoose @types/cors @types/jsonwebtoken @types/bcryptjs
