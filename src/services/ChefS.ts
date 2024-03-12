import  { ChefI } from "../models/chef";
import {  Model, FilterQuery } from 'mongoose';
import GenericService from './GenericService';

class ChefService extends GenericService<ChefI> {
  constructor( model: Model<ChefI>) {
    super(model);
  }
  async getFilteredChefs(filter: { isChefOfTheWeek?: boolean; isNew?: boolean; isMostViewed?: boolean }): Promise<ChefI[]> {
    try {
      const query: FilterQuery<ChefI> = {};
  
      if (filter.isChefOfTheWeek !== undefined) {
        query.isChefOfTheWeek = filter.isChefOfTheWeek;
      }
  
      if (filter.isNew !== undefined) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        query.chefStartDate = { $gte: oneYearAgo };
      }
  
      if (filter.isMostViewed !== undefined) {
        query.isMostViewedChef = filter.isMostViewed;
      }
  
      return await this.model.find(query).exec();
    } catch (error) {
      throw new Error(`Error fetching chefs: ${error}`);
    }
  }  
}

export default ChefService;
