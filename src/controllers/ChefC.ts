import { Request, Response } from "express";
import { Model } from "mongoose";
import { ChefI } from "../models/chef"; // Assuming this is the Chef model
import ChefService from "../services/ChefS";
import GenericController from "./GenericController";

class ChefController extends GenericController<ChefI> {
  private chefService: ChefService;

  constructor(model: Model<ChefI>) {
    super(model);
    this.chefService = new ChefService(model);
  }

  async getFilteredChefs(req: Request, res: Response) {
    try {
      const chefService = this.service as ChefService;
      const filter: any = {}; // Define filter object
      if (req.query.isChefOfTheWeek) {
        filter.isChefOfTheWeek = req.query.isChefOfTheWeek === 'true'; // Convert string to boolean
      }
      if (req.query.isNew) {
        filter.isNew = req.query.isNew === 'true'; // Convert string to boolean
      }
      if (req.query.isMostViewed) {
        filter.isMostViewed = req.query.isMostViewed === 'true'; // Convert string to boolean
      }
      
      const filteredChefs = await chefService.getFilteredChefs(filter);
      res.status(200).json(filteredChefs);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default ChefController;
