import mongoose, { Schema, Document } from "mongoose";

export interface dishIconI extends Document {
  title: string;
  image: string;
}

const ChefSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const DishIcons = mongoose.model<dishIconI>("DishIcon", ChefSchema);

export default DishIcons;
