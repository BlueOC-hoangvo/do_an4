import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await AuthService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId)
        return res.status(400).json({ message: "Không xác định user" });

      const result = await AuthService.logout(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMe(req: Request, res: Response) {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Chưa đăng nhập" });
    res.status(200).json({ user });
  }
}
