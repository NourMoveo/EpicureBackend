import RestaurantModel, { RestaurantI } from "../models/restaurant";

class RestaurantService {
  async createRestaurant(restaurantData: RestaurantI): Promise<RestaurantI> {
    try {
      const newRestaurant = new RestaurantModel(restaurantData);
      const savedRestaurant = await newRestaurant.save();
      return savedRestaurant;
    } catch (error) {
      throw new Error(`Error creating restaurant: ${error}`);
    }
  }

  async getAllRestaurants(): Promise<RestaurantI[]> {
    try {
      const restaurants = await RestaurantModel.find();
      return restaurants;
    } catch (error) {
      throw new Error(`Error fetching restaurants: ${error}`);
    }
  }

  async getRestaurantById(id: string): Promise<RestaurantI | null> {
    try {
      const restaurant = await RestaurantModel.findById(id);
      return restaurant;
    } catch (error) {
      throw new Error(`Error fetching restaurant: ${error}`);
    }
  }

  async updateRestaurant(id: string, restaurantData: Partial<RestaurantI>): Promise<RestaurantI | null> {
    try {
      const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id, restaurantData, { new: true });
      return updatedRestaurant;
    } catch (error) {
      throw new Error(`Error updating restaurant: ${error}`);
    }
  }

  async deleteRestaurant(id: string): Promise<void> {
    try {
      await RestaurantModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting restaurant: ${error}`);
    }
  }
}

export default new RestaurantService();
