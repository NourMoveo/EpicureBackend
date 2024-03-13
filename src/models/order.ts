import mongoose, { Schema, Document } from "mongoose";
import { DishI } from "./dish";
import { RestaurantI } from "./restaurant";

interface OrderDish {
  count: number;
  dishes: DishI;
  side: string[];
  changes: string[];
}

export interface OrderI extends Document {
  date: Date;
  total: number;
  dishesPerQuantity: OrderDish[];
  arrivingTime: number;
  restaurant: RestaurantI;
}

const OrderSchema: Schema = new Schema({
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  dishesPerQuantity: [
    {
      count: { type: Number, required: true },
      dishes: { type: Schema.Types.ObjectId, ref: "Dish", required: true },
      side: { type: [String], default: [] },
      changes: { type: [String], default: [] }
    }
  ],
  arrivingTime: { type: Number, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true }
});

const Order = mongoose.model<OrderI>("Order", OrderSchema);

export default Order;
