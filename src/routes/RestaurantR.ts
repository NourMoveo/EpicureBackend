import express, { Router } from "express";
import RestaurantController from "../controllers/RestaurantC"; // Corrected import path
import { Model } from "mongoose";
import { RestaurantI } from "../models/restaurant";
import registerRoutes from "./GenericRouter";  

const restaurantRouter = Router();
import RestaurantModel from "../models/restaurant";

const restaurantController = new RestaurantController(RestaurantModel);

// Additional routes specific to restaurants
restaurantRouter.get("/open-now", restaurantController.getOpenNowRestaurants.bind(restaurantController));
restaurantRouter.get("/popular", restaurantController.getFilteredRestaurants.bind(restaurantController));
restaurantRouter.get("/new", restaurantController.getFilteredRestaurants.bind(restaurantController));
restaurantRouter.get("/group-by-rating", restaurantController.groupRestaurantsByRating.bind(restaurantController));

// Generic routes
export const restaurantRoutes = registerRoutes(restaurantController, "restaurants"); // Pass "/restaurants" as prefix
restaurantRouter.use("/", restaurantRoutes);

export default restaurantRouter;
