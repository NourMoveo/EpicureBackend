import { Router } from "express";
import RestaurantController from "../controllers/RestaurantC";
import RestaurantModel from "../models/restaurant";
import { isAdminLoggedIn } from "../middleware/userAuthentication";

const restaurantRouter = Router();
const restaurantController = new RestaurantController(RestaurantModel);

// Route to create a new restaurant
restaurantRouter.post("/", isAdminLoggedIn, (req, res) => {
  restaurantController.create(req, res);
});

// Route to get all restaurants
restaurantRouter.get("/", (req, res) => {
  restaurantController.getAll(req, res);
});

// Route to update a restaurant
restaurantRouter.put("/:id", isAdminLoggedIn, (req, res) => {
  restaurantController.update(req, res);
});

// Route to delete a restaurant
restaurantRouter.delete("/:id", isAdminLoggedIn, (req, res) => {
  restaurantController.delete(req, res);
});

// Additional routes specific to restaurants
restaurantRouter.get("/open-now", (req, res) => {
  restaurantController.getOpenNowRestaurants(req, res);
});

restaurantRouter.get("/popular", (req, res) => {
  restaurantController.getPopularRestaurants(req, res);
});

// Route for fetching new restaurants
restaurantRouter.get("/new", (req, res) => {
  restaurantController.getNewRestaurants(req, res);
});

restaurantRouter.get("/group-by-rating", (req, res) => {
  restaurantController.groupRestaurantsByRating(req, res);
});

// Route to get a restaurant by ID
restaurantRouter.get("/:id", (req, res) => {
  restaurantController.getById(req, res);
});

export default restaurantRouter;
