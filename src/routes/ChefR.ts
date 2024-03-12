import express, { Router } from "express";
import ChefController from "../controllers/ChefC";
import registerRoutes from "./GenericRouter";  


const chefRouter = Router();
import ChefModel from "../models/chef"; // Adjust the path if necessary

const chefController = new ChefController(ChefModel);

// Additional routes specific to chefs
chefRouter.get("/filter", chefController.getFilteredChefs.bind(chefController));

// Generic routes
export const chefRoutes = registerRoutes(chefController, "chefs");
chefRouter.use("/", chefRoutes);
export default chefRouter;
