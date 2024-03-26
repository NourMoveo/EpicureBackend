import mongoose, { Schema, Document } from "mongoose";

import { DishI } from "./dish";
import { ChefI } from "./chef";

export interface RestaurantI extends Document {
  title: String;
  image: String;
  rating: Number;
  openTime: Date;
  closeTime: Date;
  establishedTime: Date;
  maxPrice: Number;
  minPrice: Number;
  distance: Number;
  isPopular: Boolean;
  chef: ChefI;
  dishes: string[];
}


const RestaurantSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  openTime: { type: Date, required: true },
  closeTime: { type: Date, required: true },
  establishedTime: { type: Date, required: true },
  maxPrice: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  distance: { type: Number, required: true },
  rating: { type: Number, required: true },
  isPopular: { type: Boolean, required: true, default: false },
  chef: { type: Schema.Types.ObjectId, ref: "Chef" },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish" }],

});

const Restaurant = mongoose.model<RestaurantI>("Restaurant", RestaurantSchema);

export default Restaurant;