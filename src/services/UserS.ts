import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { UserI } from '../models/user';
import GenericService from './GenericService';
import Order, { OrderI } from '../models/order';

class UserService extends GenericService<UserI> {
  constructor(model: Model<UserI>) {
    super(model);
  }
  async signUp(userData: UserI): Promise<void> {
    try {
      console.log('User data:', userData);
      const saltRounds = 10;
      console.log('Password:', userData.password); // Add this line to check the password
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      const newUser = new this.model({
        ...userData,
        password: hashedPassword,
      });
      await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }
  
  
  async userLogin(email: string, password: string): Promise<string> {
    try {
      const user = await this.model.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      if (user.role !== 'user') {
        throw new Error('Access denied. Only admins can log in here.');
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '3h',
      });
      return token;
    } catch (error) {
      throw new Error('Error logging in');
    }
  }


  async adminLogin(email: string, password: string): Promise<string> {
    try {
      const user = await this.model.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }
      if (user.role !== 'admin') {
        throw new Error('Access denied. Only admins can log in here.');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '3h',
      });
      return token;
    } catch (error) {
      throw new Error('Error during login');
    }
  }
  async addOrder(email: string, newOrderData: OrderI): Promise<void> {
      try {
          const newOrder = new Order(newOrderData);
          await newOrder.save();
  
          // Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
              throw new Error('User not found');
          }
  
          user.orders.push(newOrder);
          await user.save();
      } catch (error) {
          console.error('Error adding order to user:', error);
          throw new Error('Error adding order to user');
      }
  }

  async getOrdersHistory(email: string): Promise<OrderI[]> {
    try {
        // Find the user by email
        const user = await User.findOne({ email }).populate('orders');
        if (!user) {
            throw new Error('User not found');
        }
        return user.orders;
    } catch (error) {
        console.error('Error fetching orders by email:', error);
        throw new Error('Error fetching orders by email');
    }
}

  
  

  
}

export default UserService;
