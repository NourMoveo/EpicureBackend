import DishModel, { DishI } from "../models/dish";

class DishService {
  async createDish(dishData: DishI): Promise<DishI> {
    try {
      const newDish = new DishModel(dishData);
      const savedDish = await newDish.save();
      return savedDish;
    } catch (error) {
      throw new Error(`Error creating dish: ${error}`);
    }
  }

  async getAllDishes(): Promise<DishI[]> {
    try {
      const dishes = await DishModel.find();
      return dishes;
    } catch (error) {
      throw new Error(`Error fetching dishes: ${error}`);
    }
  }

  async getDishById(id: string): Promise<DishI | null> {
    try {
      const dish = await DishModel.findById(id);
      return dish;
    } catch (error) {
      throw new Error(`Error fetching dish: ${error}`);
    }
  }

  async updateDish(id: string, dishData: Partial<DishI>): Promise<DishI | null> {
    try {
      const updatedDish = await DishModel.findByIdAndUpdate(id, dishData, { new: true });
      return updatedDish;
    } catch (error) {
      throw new Error(`Error updating dish: ${error}`);
    }
  }

  async deleteDish(id: string): Promise<void> {
    try {
      await DishModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting dish: ${error}`);
    }
  }
}

export default new DishService();
