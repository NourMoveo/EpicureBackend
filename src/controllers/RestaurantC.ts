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
 

  getPopularRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const popularRestaurants = await this.restaurantService.getPopularRestaurants();

      if (popularRestaurants.length === 0) {
        res.status(404).json({ error: "No popular restaurants found" });
      } else {
        res.status(200).json(popularRestaurants);
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  getNewRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const newRestaurants = await this.restaurantService.getNewRestaurants();

      if (newRestaurants.length === 0) {
        res.status(404).json({ error: "No new restaurants found" });
      } else {
        res.status(200).json(newRestaurants);
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
