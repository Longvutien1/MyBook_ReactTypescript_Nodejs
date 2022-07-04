import { OrderType, ProductType, UserType } from "../types/products";
import instance from "./instance";



export const listOrder = () => {
    const url = "/orders";
    return instance.get(url)
}

export const orderDetail = (id:number) => {
    const url = `/orders/${id}`;
    return instance.get(url)
}
export const addOrder = (order:OrderType  ) => {
    const url = `/orders`;
    return instance.post(url,order)

}

export const removeOrder = (id:number) => {
    const url = `/orders/${id}`;
    return instance.delete(url);
}

export const updateOrder = (order:OrderType) => {
    const url = `/orders/${order._id}`;
    return instance.put(url, order);
}