import { Request, Response } from "express";
import { Model } from "mongoose";
import { OrderI } from "../models/order";
import OrderService from "../services/OrderS";
import GenericController from "./GenericController";

class OrderController extends GenericController<OrderI> {
  private OrderService: OrderService;

  constructor(model: Model<OrderI>) {
    super(model);
    this.OrderService = new OrderService(model);
  }


}

export default OrderController;
