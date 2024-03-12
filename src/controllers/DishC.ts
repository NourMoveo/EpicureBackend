import { Request, Response } from "express";
import { Model } from "mongoose";
import { DishI } from "../models/dish"; // Assuming this is the Dish model
import DishService from "../services/DishS";
import GenericController from "./GenericController";

class DishController extends GenericController<DishI> {
  constructor(model: Model<DishI>) {
    super(model);
  }

  async getSignatureDishes(req: Request, res: Response) {
    try {
      const signatureDishes = await (this.service as DishService).getSignatureDishes();
      res.json(signatureDishes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllDishesByType(req: Request, res: Response) {
    try {
      const type = req.params.type;
      const dishes = await (this.service as DishService).getAllDishesByType(type);
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default DishController;
