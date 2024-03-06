import { Request, Response } from "express";
import DishService from "../services/DishS";

class DishController {
  static async createDish(req: Request, res: Response) {
    try {
      const newDish = await DishService.createDish(req.body);
      res.status(201).json(newDish);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAllDishes(req: Request, res: Response) {
    try {
      const dishes = await DishService.getAllDishes();
      res.status(200).json(dishes);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getDishById(req: Request, res: Response) {
    try {
      const dishId = req.params.id;
      const dish = await DishService.getDishById(dishId);
      if (!dish) {
        res.status(404).json({ error: "Dish not found" });
        return;
      }
      res.status(200).json(dish);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateDish(req: Request, res: Response) {
    try {
      const dishId = req.params.id;
      const updatedDish = await DishService.updateDish(dishId, req.body);
      if (!updatedDish) {
        res.status(404).json({ error: "Dish not found" });
        return;
      }
      res.status(200).json(updatedDish);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteDish(req: Request, res: Response) {
    try {
      const dishId = req.params.id;
      await DishService.deleteDish(dishId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default DishController;
