import express, { Router, Request, Response } from "express";
import DishController from "../controllers/DishC";
import registerRoutes from "./GenericRouter";  

const dishRouter = Router();
import DishModel from "../models/dish"; // Adjust the path if necessary

const dishController = new DishController(DishModel);

// Additional routes specific to dishes
dishRouter.get("/signature", dishController.getSignatureDishes.bind(dishController));
dishRouter.get("/type/:type", dishController.getAllDishesByType.bind(dishController));

// Generic routes
export const dishRoutes = registerRoutes(dishController, "dishes");
dishRouter.use("/", dishRoutes);
export default dishRouter;
