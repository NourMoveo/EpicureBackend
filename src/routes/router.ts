import express from "express";
import RestaurantRouter from "./RestaurantR";
import DishRouter from "./DishR";
import ChefRouter from "./ChefR";

const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.send("Welcome to the base route!");
});

router.use("/restaurants", RestaurantRouter);
router.use("/dishes", DishRouter);
router.use("/chefs", ChefRouter);
export default router;
