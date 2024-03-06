import express from "express";
import RestaurantController from "../controllers/RestaurantC";

const router = express.Router();

router.post("/", RestaurantController.createRestaurant);
router.get("/", RestaurantController.getAllRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);
router.put("/:id", RestaurantController.updateRestaurant);
router.delete("/:id", RestaurantController.deleteRestaurant);

export default router;
