import { Model } from 'mongoose';
import { RestaurantI } from '../models/restaurant';
import GenericService from './GenericService';

class RestaurantService extends GenericService<RestaurantI> {
  constructor(model: Model<RestaurantI>) {
    super(model);
  }

  
  async getOpenNowRestaurants(): Promise<RestaurantI[]> {
    try {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const allRestaurants = await this.model.find().exec();
      const openNowRestaurants = allRestaurants.filter(restaurant => {
        const openHours = restaurant.openTime.getHours();
        const openMinutes = restaurant.openTime.getMinutes();
        const closeHours = restaurant.closeTime.getHours();
        const closeMinutes = restaurant.closeTime.getMinutes();
        const isOpenNow =
          (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
          (currentHours < closeHours || (currentHours === closeHours && currentMinutes < closeMinutes));
        return isOpenNow;
      });
      return openNowRestaurants;
    } catch (error) {
      throw new Error(`Error fetching open now restaurants: ${error}`);
    }
  }

 
  async getFilteredRestaurants(filter: { isPopular?: boolean; isNew?: boolean }): Promise<RestaurantI[]> {
    try {
      const query: any = {};
  
      if (filter.isPopular !== undefined) {
        query.isPopular = filter.isPopular;
      }
  
      if (filter.isNew !== undefined) {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        query.establishedTime = { $gte: oneYearAgo };
      }
  
      return await this.model.find(query).exec();
    } catch (error) {
      throw new Error(`Error fetching restaurants: ${error}`);
    }
  }

  async groupRestaurantsByRating(): Promise<RestaurantI[][]> {
    try {
      const allRestaurants = await this.model.find().exec();
      const groupedRestaurants: RestaurantI[][] = Array.from({ length: 5 }, () => []);
      allRestaurants.forEach(restaurant => {
        const rating = Number(restaurant.rating);
        if (!isNaN(rating) && rating >= 1 && rating <= 5) {
          groupedRestaurants[rating - 1].push(restaurant);
        } else {
          console.error(`Invalid rating found for restaurant: ${restaurant.title}`);
        }
      });
      return groupedRestaurants;
    } catch (error) {
      throw new Error(`Error grouping restaurants by rating: ${error}`);
    }
  }
}

export default RestaurantService;
