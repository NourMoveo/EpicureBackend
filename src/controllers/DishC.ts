import { Request, Response } from "express";
import { Model } from "mongoose";
import { DishI } from "../models/dish";
import DishService from "../services/DishS";
import GenericController from "./GenericController";

class DishController extends GenericController<DishI> {
  private dishService: DishService;

  constructor(model: Model<DishI>) {
    super(model);
    this.dishService = new DishService(model);
  }

  async getSignatureDishes(req: Request, res: Response) {
    try {
      const signatureDishes = await this.dishService.getSignatureDishes();
      res.json(signatureDishes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllDishesByType(req: Request, res: Response): Promise<void> {
    try {
        const type = req.params.type;
        const dishes = await this.dishService.getAllDishesByType(type);
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
}

export default DishController;
