import { Router } from "express";
import { BrandController } from "./brand.controller";
import { Guard } from "../../common/middlewares/guards";

const brandRouter = Router();

brandRouter.get("/", BrandController.getAll);
brandRouter.get("/fe", BrandController.getAllFe);
brandRouter.get("/:id", BrandController.getById);

brandRouter.post("/", ...Guard.admin, BrandController.create);
brandRouter.put("/:id", ...Guard.admin, BrandController.update);
brandRouter.delete("/:id", ...Guard.admin, BrandController.delete);

export default brandRouter;
