import express, { Router } from "express";
import UserController from "../controllers/UserC";
import UserModel from "../models/user"; // Adjust the path if necessary

const userRouter = Router();
const userController = new UserController(UserModel);

// Route to create a new user
userRouter.post("/", (req, res) => {
    userController.create(req, res);
});

// Route to get all users
userRouter.get("/", (req, res) => {
    userController.getAll(req, res);
});

// Route to update a user
userRouter.put("/:id", (req, res) => {
    userController.update(req, res);
});

// Route to delete a user
userRouter.delete("/:id", (req, res) => {
    userController.delete(req, res);
});



// Route to get user by ID
userRouter.get("/:id", (req, res) => {
    userController.getById(req, res);
});

export default userRouter;
