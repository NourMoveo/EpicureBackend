import express, { Router } from "express";
import DishController from "../controllers/DishC";
import DishModel from "../models/dish"; // Adjust the path if necessary

const dishRouter = Router();
const dishController = new DishController(DishModel);

// Route to create a new dish
dishRouter.post("/", (req, res) => {
    dishController.create(req, res);
});

// Route to get all dishes
dishRouter.get("/", (req, res) => {
    dishController.getAll(req, res);
});

// Route to update a dish
dishRouter.put("/:id", (req, res) => {
    dishController.update(req, res);
});

// Route to delete a dish
dishRouter.delete("/:id", (req, res) => {
    dishController.delete(req, res);
});

// Route to get signature dishes
dishRouter.get("/signature", (req, res) => {
    dishController.getSignatureDishes(req, res);
});

// Route to get dishes by type
dishRouter.get("/type/:type", (req, res) => {
    dishController.getAllDishesByType(req, res);
});

// Route to get dish by ID
dishRouter.get("/:id", (req, res) => {
    dishController.getById(req, res);
});

export default dishRouter;
