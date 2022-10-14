import { Router } from "express"
import orderRouter from "./modules/order/router.js";
import userRouter from "./modules/user/router.js";
import productRouter from './modules/product/router.js';
import { auth } from "./middleware/auth.js";

const routers = Router();


/**
 * Sellers
 * 
 */
routers.use('/account', userRouter);

/**
 * Products
 * 
 */
 routers.use('/products', productRouter);
 
 
/**
 * Orders
 * 
 */
routers.use(auth, orderRouter);

//
export default routers;