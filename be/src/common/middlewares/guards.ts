import { authMiddleware } from "./auth.middleware";
import { roleMiddleware } from "./role.middleware";

export const Guard = {
  auth: [authMiddleware],
  admin: [authMiddleware, roleMiddleware(["admin"])],
  manager: [authMiddleware, roleMiddleware(["admin", "manager"])],
  roles: (roles: string[]) => [authMiddleware, roleMiddleware(roles)],
};
