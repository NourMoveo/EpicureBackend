import express, { Router } from "express";
import UserController from "../controllers/UserC";
import UserModel from "../models/user";
import { authenticateUser, verifyToken } from "../middleware/userAuthentication";

const userRouter = Router();
const userController = new UserController(UserModel);

// Route to create a new user
userRouter.post("/", (req, res) => {
    userController.create(req, res);
});

// Route to authenticate user and issue JWT token
userRouter.post("/login", authenticateUser);

// Protected routes - require valid JWT token
userRouter.use(verifyToken);

// Route to get all users (protected)
userRouter.get("/", (req, res) => {
    userController.getAll(req, res);
});

// Route to update a user (protected)
userRouter.put("/:id", (req, res) => {
    userController.update(req, res);
});

// Route to delete a user (protected)
userRouter.delete("/:id", (req, res) => {
    userController.delete(req, res);
});

// Route to get user by ID (protected)
userRouter.get("/:id", (req, res) => {
    userController.getById(req, res);
});

export default userRouter;
