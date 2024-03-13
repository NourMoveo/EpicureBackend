import express, { Router } from "express";
import OrderController from "../controllers/OrderC";
import OrderModel from "../models/order"; // Adjust the path if necessary

const orderRouter = Router();
const orderController = new OrderController(OrderModel);

// Route to create a new order
orderRouter.post("/", (req, res) => {
    orderController.create(req, res);
});

// Route to get all orders
orderRouter.get("/", (req, res) => {
    orderController.getAll(req, res);
});

// Route to update a order
orderRouter.put("/:id", (req, res) => {
    orderController.update(req, res);
});

// Route to delete a order
orderRouter.delete("/:id", (req, res) => {
    orderController.delete(req, res);
});


// Route to get order by ID
orderRouter.get("/:id", (req, res) => {
    orderController.getById(req, res);
});

export default orderRouter;
