import mongoose, { Schema, Document } from "mongoose";
import { DishI } from "./dish";
import { RestaurantI } from "./restaurant";

export interface OrderI extends Document {
  date: Date;
  total: number;
  dishesPerQuantity: { count: number; dishes: DishI }[];
  arrivingTime: number;
  restaurant: RestaurantI;
}

const OrderSchema: Schema = new Schema({
  date: { type: Date, required: true },
  total: { type: Number, required: true },
  dishesPerQuantity: [
    {
      count: { type: Number, required: true },
      dishes: { type: Schema.Types.ObjectId}
    }
  ],
  arrivingTime: { type: Number, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" }
});

const Order = mongoose.model<OrderI>("Order", OrderSchema);

export default Order;
