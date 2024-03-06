import mongoose, { Schema, Document } from "mongoose";

import { restaurantI } from "./restaurant";

export interface chefI extends Document {
  fName: string;
  lName: string;
  image: string;
  description: string;
  restaurants: restaurantI[];
  isChefOfTheWeek: boolean;
}

const ChefSchema: Schema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  restaurants: [
    { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  ],
  isChefOfTheWeek: { type: Boolean, required: true, default: false },
});

const Chef = mongoose.model<chefI>("Chef", ChefSchema);

export default Chef;
