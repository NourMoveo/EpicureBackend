import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./dataBase";
import restaurantRoutes from "./src/routes/RestaurantR";
import dishRoutes from "./src/routes/DishR";
import chefRoutes from "./src/routes/ChefR";
import userRoutes from "./src/routes/UserR";
import orderRoutes from "./src/routes/OrderR";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/users', userRoutes );
app.use('/api/orders', orderRoutes );

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
