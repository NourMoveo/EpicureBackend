import { Request, Response } from "express";
import { Model } from "mongoose";
import {  UserI } from "../models/user";
import  UserService from "../services/UserS";
import GenericController from "./GenericController";
import { OrderI } from "../models/order";


class UserController extends GenericController<UserI> {
  private userService: UserService;

  constructor(model: Model<UserI>) {
    super(model);
    console.log('Model:', model); // Check the model instance
    this.userService = new UserService(model);
    console.log('UserService:', this.userService); // Check if userService is properly initialized
  }

  signUp = async (req: Request, res: Response): Promise<void> =>{
    try {
      const userData = req.body;
      await this.userService.signUp(userData as UserI);
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  userLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.userLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.adminLogin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }
  
 addOrder= async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, newOrderData } = req.body; // Assuming email and newOrderData are sent in the request body

        await this.userService.addOrder(email, newOrderData);

        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ error: 'Error adding order' });
    }
};

getOrdersHistory = async (req: Request, res: Response): Promise<void> => {
  try {
      const { email } = req.params; // Assuming email is passed as a URL parameter
      const orders = await this.userService.getOrdersHistory(email);
      res.status(200).json({ orders });
  } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Error fetching orders' });
  }
};
}

export default UserController;
