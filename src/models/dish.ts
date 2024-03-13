import mongoose, { Schema, Document } from "mongoose";
import { RestaurantI } from "./restaurant";

export interface DishI extends Document {
    title: string;
    image: string;
    ingredients: string;
    flavorIcon: string;
    price: number;
    restaurant: RestaurantI;
    isSignature: boolean;
    type: string;
    dishSides: string[];
    changes: string[];
}

const DishSchema: Schema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    ingredients: { type: String, required: true },
    flavorIcon: { type: String, required: true },
    price: { type: Number, required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    isSignature: { type: Boolean, required: true },
    type: { type: String, required: true },
    dishSides: { type: [String], default: [] },
    changes: { type: [String], default: [] }
});

const Dish = mongoose.model<DishI>("Dish", DishSchema);

export default Dish;
