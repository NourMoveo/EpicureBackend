import { Model, FilterQuery } from 'mongoose';
import GenericService from './GenericService';
import { ChefI } from '../models/chef';

class ChefService extends GenericService<ChefI> {
    constructor(model: Model<ChefI>) {
        super(model);
    }


    async getChefOfTheWeek(): Promise<ChefI[]> {
      try {
          return await this.model.find({ isChefOfTheWeek: true }).exec();
      } catch (error) {
          throw new Error(`Error fetching chef of the week: ${error}`);
      }
  }

  async getNewChefs(): Promise<ChefI[]> {
      try {
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          return await this.model.find({ chefStartDate: { $gte: oneYearAgo } }).exec();
      } catch (error) {
          throw new Error(`Error fetching new chefs: ${error}`);
      }
  }

  async getMostViewedChefs(): Promise<ChefI[]> {
      try {
          return await this.model.find({ isMostViewedChef: true }).exec();
      } catch (error) {
          throw new Error(`Error fetching most viewed chefs: ${error}`);
      }
  }

}

export default ChefService;
