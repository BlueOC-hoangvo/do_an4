import { Request, Response } from "express";
import { BrandService } from "./brand.service";

export class BrandController {
  static async getAll(req: Request, res: Response) {
    try {
      const brands = await BrandService.getAll();
      res.status(200).json(brands);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const brand = await BrandService.getById(id);
      if (!brand) return res.status(404).json({ message: "Brand not found" });

      res.status(200).json(brand);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllFe(req: Request, res: Response) {
    try {
      const status = req.query.status ? Number(req.query.status) : 1;
      const brands = await BrandService.getAllByStatus(status);
      res.status(200).json(brands);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const result = await BrandService.create(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await BrandService.update(id, req.body);
      res.status(200).json(result);
    } catch (error: any) {
      const status = error.message === "Brand not found" ? 404 : 500;
      res.status(status).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await BrandService.delete(id);
      res.status(200).json(result);
    } catch (error: any) {
      const status = error.message === "Brand not found" ? 404 : 500;
      res.status(status).json({ message: error.message });
    }
  }
}
