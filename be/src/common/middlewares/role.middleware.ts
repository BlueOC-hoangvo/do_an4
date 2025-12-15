import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "Không có thông tin người dùng" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập route này",
        required: allowedRoles,
      });
    }

    next();
  };
};
