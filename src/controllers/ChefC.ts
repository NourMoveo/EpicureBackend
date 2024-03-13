import { Request, Response } from "express";
import { Model } from "mongoose";
import { ChefI } from "../models/chef";
import ChefService from "../services/ChefS";
import GenericController from "./GenericController";

class ChefController extends GenericController<ChefI> {
  private chefService: ChefService;

  constructor(model: Model<ChefI>) {
    super(model);
    this.chefService = new ChefService(model);
  }

  async getChefOfTheWeek(req: Request, res: Response): Promise<void> {
    try {
      const chefOfTheWeek = await this.chefService.getChefOfTheWeek();
      res.status(200).json(chefOfTheWeek);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getNewChefs(req: Request, res: Response): Promise<void> {
    try {
      const newChefs = await this.chefService.getNewChefs();
      res.status(200).json(newChefs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMostViewedChefs(req: Request, res: Response): Promise<void> {
    try {
      const mostViewedChefs = await this.chefService.getMostViewedChefs();
      res.status(200).json(mostViewedChefs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default ChefController;
