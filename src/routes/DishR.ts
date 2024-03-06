import express from "express";
import DishController from "../controllers/DishC";

const router = express.Router();

router.post("/", DishController.createDish);
router.get("/", DishController.getAllDishes);
router.get("/:id", DishController.getDishById);
router.put("/:id", DishController.updateDish);
router.delete("/:id", DishController.deleteDish);

export default router;
