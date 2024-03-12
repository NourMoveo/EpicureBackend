import mongoose, { Schema, Document } from "mongoose";
import { DishType } from "./Enums/dishType";
import { RestaurantI } from "./restaurant";


export interface DishI extends Document {
    title: String;
    image: String;
    ingredients: String;
    flavorIcon: String;
    price: Number;
    restaurant: RestaurantI;
    isSignature: Boolean;
    type: string;
}


const DishSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    flavorIcon:{ type: String, required: true },
    price: { type: Number, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    isSignature: { type: Boolean, required: true },
    type: { type: String, required: true }
});
  
  const Dish = mongoose.model<DishI>("Dish", DishSchema);
  
  export default Dish;