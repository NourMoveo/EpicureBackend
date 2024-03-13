import { Model } from 'mongoose';
import { UserI } from '../models/user';
import GenericService from './GenericService';

class UserService extends GenericService<UserI> {
  constructor(model: Model<UserI>) {
    super(model);
  }


  
}

export default UserService;
