import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import brandRouter from "./modules/brand/brand.route";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Để đọc JSON body

// Routes
app.use("/api/auth", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter); // <-- Thêm dòng này
// Test Route
app.get("/", (req, res) => {
  res.send("Watch Store API is running...");
});

export default app;
