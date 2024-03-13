import { Model } from 'mongoose';
import { OrderI } from '../models/order';
import GenericService from './GenericService';

class OrderService extends GenericService<OrderI> {
  constructor(model: Model<OrderI>) {
    super(model);
  }


  
}

export default OrderService;
