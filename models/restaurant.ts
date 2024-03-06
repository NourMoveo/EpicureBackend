import mongoose, { Schema, Document } from "mongoose";

import { dishI } from "./dish";
import { chefI } from "./chef";

export interface restaurantI extends Document {
  title: String;
  image: String;
  rating: Number;
  open:Date;
  close:Date;
  maxPrice:Number;
  minPrice:Number;
  distance:Number;
  isPopular: Boolean;
  chef: chefI;
  dishes: dishI;

}


const RestaurantSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  open: { type: Date, required: true },
  close: { type: Date, required: true },
  maxPrice: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  isPopular: { type: Boolean, required: true, default: false },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish", required: true }],

});

const Restaurant = mongoose.model<restaurantI>("Restaurant", RestaurantSchema);

export default Restaurant;