import { ErrorRequestHandler, Request, Response, NextFunction, Router } from "express";
import ChefController from "../controllers/ChefC";
import ChefModel from "../models/chef"; // Adjust the path if necessary
import {  isAdminLoggedIn } from "../middleware/userAuthentication";

const chefRouter = Router();
const chefController = new ChefController(ChefModel);

// Route to create a new chef
chefRouter.post("/",  isAdminLoggedIn, (req: Request, res: Response) => {
    chefController.create(req, res);
});

// Route to get all chefs
chefRouter.get("/", (req: Request, res: Response) => {
    chefController.getAll(req, res);
});

// Route to update a chef
chefRouter.put("/:id", isAdminLoggedIn, (req: Request, res: Response) => {
    chefController.update(req, res);
});

// Route to delete a chef
chefRouter.delete("/:id",  isAdminLoggedIn, (req: Request, res: Response) => {
    chefController.delete(req, res);
});

// Additional routes specific to chefs
chefRouter.get('/chef-of-the-week', (req: Request, res: Response) => {
    chefController.getChefOfTheWeek(req, res);
});

chefRouter.get('/new', (req: Request, res: Response) => {
    chefController.getNewChefs(req, res);
});

chefRouter.get('/most-viewed', (req: Request, res: Response) => {
    chefController.getMostViewedChefs(req, res);
});

chefRouter.get("/:id", (req: Request, res: Response) => {
    chefController.getById(req, res);
});

// Error handling middleware
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

chefRouter.use(errorHandler);

export default chefRouter;
