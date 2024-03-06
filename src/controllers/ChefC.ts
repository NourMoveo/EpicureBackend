import { Request, Response } from "express";
import ChefService from "../services/ChefS";

class ChefController {
  static async createChef(req: Request, res: Response) {
    try {
      const newChef = await ChefService.createChef(req.body);
      res.status(201).json(newChef);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAllChefs(req: Request, res: Response) {
    try {
      const chefs = await ChefService.getAllChefs();
      res.status(200).json(chefs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getChefById(req: Request, res: Response) {
    try {
      const chefId = req.params.id;
      const chef = await ChefService.getChefById(chefId);
      if (!chef) {
        res.status(404).json({ error: "Chef not found" });
        return;
      }
      res.status(200).json(chef);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateChef(req: Request, res: Response) {
    try {
      const chefId = req.params.id;
      const updatedChef = await ChefService.updateChef(chefId, req.body);
      if (!updatedChef) {
        res.status(404).json({ error: "Chef not found" });
        return;
      }
      res.status(200).json(updatedChef);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteChef(req: Request, res: Response) {
    try {
      const chefId = req.params.id;
      await ChefService.deleteChef(chefId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default ChefController;
