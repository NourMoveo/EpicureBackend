import {Router} from 'express';
import UserController from '../controllers/UserC';
import UserModel from '../models/user';
import { authenticateToken } from '../middleware/userAuthentication';

const userRouter = Router();
const userController = new UserController(UserModel);


userRouter.get("/", (req, res) => {
    userController.getAll(req, res); 
});
userRouter.post('/signup', userController.signUp);
userRouter.post('/login', userController.userLogin);
userRouter.post('/admin/login', userController.adminLogin);
userRouter.post('/add-order', authenticateToken, userController.addOrder);
userRouter.get('/orders-history/:email', authenticateToken, userController.getOrdersHistory);

userRouter.get('/:id', userController.getById);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default  userRouter;
