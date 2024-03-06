import mongoose, { Schema, Document } from "mongoose";
import { DishType } from "./Enums/dishType";
import { restaurantI } from "./restaurant";
import { dishIconI } from "./dishIcon";


// Interface for the dish document
export interface dishI extends Document {
    title: String;
    image: String;
    ingredients: String[];
    icons: dishIconI[];
    price: Number;
    restaurant: restaurantI;
    isSignature: Boolean;
    type: DishType;
}
const DishSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: [String], required: true },
    icons: { type: [{ type: Schema.Types.ObjectId, ref: "DishIcon" }], required: true },
    price: { type: Number, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    isSignature: { type: Boolean, required: true },
    type: { type: String, enum: Object.values(DishType), required: true }
});
  
  const Dish = mongoose.model<dishI>("Dish", DishSchema);
  
  export default Dish;