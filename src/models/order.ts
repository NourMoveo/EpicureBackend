import mongoose, { Schema, Document } from "mongoose";
import { DishI } from "./dish";

export interface OrderDish {
  dish: DishI;
  quantity: number;
}

export interface OrderI extends Document {
  date: Date;
  total: number;
  dishes: OrderDish[];
  arrivingTime: number;
  comment: string;
}

const OrderDishSchema: Schema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  dishes: [OrderDishSchema],
  arrivingTime: { type: Number, required: true },
  comment: { type: String },
});

const Order = mongoose.model<OrderI>("Order", OrderSchema);

export default Order;
