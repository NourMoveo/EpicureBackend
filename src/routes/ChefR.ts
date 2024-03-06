import express from "express";
import ChefController from "../controllers/ChefC";

const router = express.Router();

router.post("/", ChefController.createChef);
router.get("/", ChefController.getAllChefs);
router.get("/:id", ChefController.getChefById);
router.put("/:id", ChefController.updateChef);
router.delete("/:id", ChefController.deleteChef);

export default router;
