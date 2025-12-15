import { Router } from "express";
import { StrapTypeController } from "./straptype.controller";

const strapTypeRouter = Router();

strapTypeRouter.get("/", StrapTypeController.getAll);
strapTypeRouter.get("/:id", StrapTypeController.getById);
strapTypeRouter.post("/", StrapTypeController.create);
strapTypeRouter.put("/:id", StrapTypeController.update);
strapTypeRouter.delete("/:id", StrapTypeController.delete);

export default strapTypeRouter;
