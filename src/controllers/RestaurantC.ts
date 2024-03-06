import { Request, Response } from "express";
import RestaurantService from "../services/RestaurantS";

class RestaurantController {
  static async createRestaurant(req: Request, res: Response) {
    try {
      const newRestaurant = await RestaurantService.createRestaurant(req.body);
      res.status(201).json(newRestaurant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAllRestaurants(req: Request, res: Response) {
    try {
      const restaurants = await RestaurantService.getAllRestaurants();
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getRestaurantById(req: Request, res: Response) {
    try {
      const restaurantId = req.params.id;
      const restaurant = await RestaurantService.getRestaurantById(restaurantId);
      if (!restaurant) {
        res.status(404).json({ error: "Restaurant not found" });
        return;
      }
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateRestaurant(req: Request, res: Response) {
    try {
      const restaurantId = req.params.id;
      const updatedRestaurant = await RestaurantService.updateRestaurant(restaurantId, req.body);
      if (!updatedRestaurant) {
        res.status(404).json({ error: "Restaurant not found" });
        return;
      }
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteRestaurant(req: Request, res: Response) {
    try {
      const restaurantId = req.params.id;
      await RestaurantService.deleteRestaurant(restaurantId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default RestaurantController;
