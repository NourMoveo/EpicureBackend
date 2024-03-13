import express, { Router } from "express";
import ChefController from "../controllers/ChefC";
import ChefModel from "../models/chef"; // Adjust the path if necessary

const chefRouter = Router();
const chefController = new ChefController(ChefModel);

// Route to create a new chef
chefRouter.post("/", (req, res) => {
    chefController.create(req, res);
});

// Route to get all chefs
chefRouter.get("/", (req, res) => {
    chefController.getAll(req, res);
});

// Route to update a chef
chefRouter.put("/:id", (req, res) => {
    chefController.update(req, res);
});

// Route to delete a chef
chefRouter.delete("/:id", (req, res) => {
    chefController.delete(req, res);
});

// Additional routes specific to chefs
chefRouter.get('/chef-of-the-week', (req, res) => {
    chefController.getChefOfTheWeek(req, res);
});

chefRouter.get('/new', (req, res) => {
    chefController.getNewChefs(req, res);
});

chefRouter.get('/most-viewed', (req, res) => {
    chefController.getMostViewedChefs(req, res);
});

chefRouter.get("/:id", (req, res) => {
    chefController.getById(req, res);
});


export default chefRouter;
