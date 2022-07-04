
import express from 'express';
import { addOrder, editOrder, listOrder, orderDetail, removeOrder, updateOrder } from '../controllers/order';


const routerOrder = express.Router();

routerOrder.post('/orders', addOrder);
routerOrder.get('/orders', listOrder);
routerOrder.get('/orders/:id', orderDetail);
routerOrder.delete('/orders/:id', removeOrder);
routerOrder.put('/orders/:id', updateOrder);


export default routerOrder;