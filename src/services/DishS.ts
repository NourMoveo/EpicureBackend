import { Model } from 'mongoose';
import { DishI } from '../models/dish';
import GenericService from './GenericService';

class DishService extends GenericService<DishI> {
  constructor(model: Model<DishI>) {
    super(model);
  }

  async getSignatureDishes(): Promise<DishI[]> {
    try {
      return await this.model.find({ isSignature: true }).exec();
    } catch (error) {
      throw new Error(`Error fetching signature dishes: ${error}`);
    }
  }
  async getAllDishesByType(type: string): Promise<DishI[]> {
    try {
        return await this.model.find({ type }).exec();
    } catch (error) {
        throw new Error(`Error fetching ${type.toLowerCase()} dishes: ${error}`);
    }
}
  
}

export default DishService;
