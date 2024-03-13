import { Request, Response } from "express";
import { Model } from "mongoose";
import { RestaurantI } from "../models/restaurant";
import RestaurantService from "../services/RestaurantS";
import GenericController from "./GenericController";

class RestaurantController extends GenericController<RestaurantI> {
  private restaurantService: RestaurantService;

  constructor(model: Model<RestaurantI>) {
    super(model);
    this.restaurantService = new RestaurantService(model);
  }

  getOpenNowRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const openNowRestaurants = await this.restaurantService.getOpenNowRestaurants();
      res.status(200).json(openNowRestaurants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
 
  getFilteredRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      // Parse query parameters into boolean values
      const isPopular = req.query.isPopular === "true";
      const isNew = req.query.isNew === "true";

      // Call the service method with the parsed filter
      const filteredRestaurants = await this.restaurantService.getFilteredRestaurants({ isPopular, isNew });

      if (filteredRestaurants.length === 0) {
        res.status(404).json({ error: "No restaurants found for the provided filter" });
      } else {
        res.status(200).json(filteredRestaurants);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  groupRestaurantsByRating = async (req: Request, res: Response): Promise<void> => {
    try {
      const groupedRestaurants = await this.restaurantService.groupRestaurantsByRating();
      res.status(200).json(groupedRestaurants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default RestaurantController;
