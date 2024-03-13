import {OrderI} from "./order";
import mongoose, { Schema, Document } from "mongoose";
import jwt from "jsonwebtoken";

export interface UserI extends Document {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  password: string;
  orders: OrderI[];
  generateToken(): string; 
}

const UserSchema: Schema = new Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

// Define the generateToken method
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "3h" // expiration time 
  });
  return token;
};

const User = mongoose.model<UserI>("User", UserSchema);

export default User;
