import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../../common/middlewares/auth.middleware";

const authRouter = Router();

// Public Routes
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/refresh-token", AuthController.refreshToken);

// Protected Routes (Cần Header: Bearer Token)
authRouter.post("/logout", authMiddleware, AuthController.logout);
authRouter.get("/me", authMiddleware, AuthController.getMe); // API lấy thông tin bản thân

export default authRouter;
