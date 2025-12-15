import { Request, Response } from "express";
import { StrapTypeService } from "./straptype.service";

export class StrapTypeController {
  static async getAll(req: Request, res: Response) {
    try {
      const status = req.query.status ? Number(req.query.status) : null;
      const data =
        status !== null
          ? await StrapTypeService.getByStatus(status)
          : await StrapTypeService.getAll();
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const data = await StrapTypeService.getById(Number(req.params.id));
      if (!data) return res.status(404).json({ message: "Not found" });
      res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await StrapTypeService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const result = await StrapTypeService.update(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(result);
    } catch (error: any) {
      const status = error.message === "Strap type not found" ? 404 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const result = await StrapTypeService.delete(Number(req.params.id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
