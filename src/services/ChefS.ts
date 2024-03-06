import ChefModel, { ChefI } from "../models/chef";

class ChefService {
  async createChef(chefData: ChefI): Promise<ChefI> {
    try {
      const newChef = new ChefModel(chefData);
      const savedChef = await newChef.save();
      return savedChef;
    } catch (error) {
      throw new Error(`Error creating chef: ${error}`);
    }
  }

  async getAllChefs(): Promise<ChefI[]> {
    try {
      const chefs = await ChefModel.find();
      return chefs;
    } catch (error) {
      throw new Error(`Error fetching chefs: ${error}`);
    }
  }

  async getChefById(id: string): Promise<ChefI | null> {
    try {
      const chef = await ChefModel.findById(id);
      return chef;
    } catch (error) {
      throw new Error(`Error fetching chef: ${error}`);
    }
  }

  async updateChef(id: string, chefData: Partial<ChefI>): Promise<ChefI | null> {
    try {
      const updatedChef = await ChefModel.findByIdAndUpdate(id, chefData, { new: true });
      return updatedChef;
    } catch (error) {
      throw new Error(`Error updating chef: ${error}`);
    }
  }

  async deleteChef(id: string): Promise<void> {
    try {
      await ChefModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting chef: ${error}`);
    }
  }
}

export default new ChefService();
