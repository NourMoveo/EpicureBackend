import { Request, Response } from "express";
import { Model } from "mongoose";
import { RestaurantI } from "../models/restaurant";
import RestaurantService from "../services/RestaurantS"; // Corrected import path
import GenericController from "./GenericController";

class RestaurantController extends GenericController<RestaurantI> {
  private restaurantService: RestaurantService;

  constructor(model: Model<RestaurantI>) {
    super(model);
    this.restaurantService = new RestaurantService(model);
  }
  getFilteredRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      // Parse query parameters into boolean values
      const isPopular = req.query.isPopular === "true";
      const isNew = req.query.isNew === "true";

      // Call the service method with the parsed filter
      const filteredRestaurants = await (this.service as RestaurantService).getFilteredRestaurants({ isPopular, isNew });

      if (filteredRestaurants.length === 0) {
        res.status(404).json({ error: "No restaurants found for the provided filter" });
      } else {
        res.status(200).json(filteredRestaurants);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  getOpenNowRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const openNowRestaurants = await (this.service as RestaurantService).getOpenNowRestaurants();
      res.status(200).json(openNowRestaurants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  groupRestaurantsByRating = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupedRestaurants = await (this.service as RestaurantService).groupRestaurantsByRating();
      res.status(200).json(groupedRestaurants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default RestaurantController;
