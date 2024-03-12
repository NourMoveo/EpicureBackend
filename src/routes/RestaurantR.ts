import express, { Router } from "express";
import RestaurantController from "../controllers/RestaurantC"; // Corrected import path
import { Model } from "mongoose";
import { RestaurantI } from "../models/restaurant";
import RestaurantModel from "../models/restaurant";

const restaurantRouter = Router();
const restaurantController = new RestaurantController(RestaurantModel);

// Route to create a new restaurant
restaurantRouter.post("/", (req, res) => {
    restaurantController.create(req, res);
});

// Route to get all restaurants
restaurantRouter.get("/", (req, res) => {
    restaurantController.getAll(req, res);
});

// Route to update a restaurant
restaurantRouter.put("/:id", (req, res) => {
    restaurantController.update(req, res);
});

// Route to delete a restaurant
restaurantRouter.delete("/:id", (req, res) => {
    restaurantController.delete(req, res);
});

// Additional routes specific to restaurants
restaurantRouter.get("/open-now", (req, res) => {
    restaurantController.getOpenNowRestaurants(req, res);
});

restaurantRouter.get("/popular", (req, res) => {
    restaurantController.getFilteredRestaurants(req, res);
});

restaurantRouter.get("/new", (req, res) => {
    restaurantController.getFilteredRestaurants(req, res);
});

restaurantRouter.get("/group-by-rating", (req, res) => {
    restaurantController.groupRestaurantsByRating(req, res);
});

// Route to get a restaurant by ID
restaurantRouter.get("/:id", (req, res) => {
    restaurantController.getById(req, res);
});

export default restaurantRouter;
