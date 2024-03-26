import mongoose, { Schema, Document } from "mongoose";

import { RestaurantI } from "./restaurant";

export interface ChefI extends Document {
  fName: string;
  lName: string;
  image: string;
  description: string;
  restaurant: RestaurantI[];
  isChefOfTheWeek: boolean;
  isMostViewedChef: boolean;
  chefStartDate:Date;
}

const ChefSchema: Schema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  image: { type: String, required: true },
  description: {
    type: String,
    required: true,
    trim: true,
    set: (value: string) => value.replace(/\s+/g, ' ').trim(), 
    validate: [
      {
        validator: (value: string) => !(/^\s*$/.test(value)),
        message: "Description cannot be empty or contain only spaces"
      }
    ]
  },
  restaurant:
    [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  isChefOfTheWeek: { type: Boolean, required: true, default: false },
  isMostViewedChef: { type: Boolean, required: true, default: false },
  chefStartDate: { type: Date, required: true },
});

const Chef = mongoose.model<ChefI>("Chef", ChefSchema);

export default Chef;
