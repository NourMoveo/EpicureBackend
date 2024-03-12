import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config";
import { restaurantRoutes } from "./src/routes/RestaurantR";
import { dishRoutes } from "./src/routes/DishR";
import { chefRoutes } from "./src/routes/ChefR";

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', restaurantRoutes);
app.use('/api', chefRoutes);
app.use('/api', dishRoutes);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
