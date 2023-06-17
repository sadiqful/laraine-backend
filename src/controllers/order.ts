import { Request, Response } from "express";
import Order from '../models/order';
import { IOrder, IOrderItem } from "../types";

type CreateOrderType = Pick <
    IOrder, "deliveryAddress" | "totalPrice" | "user" | "orderItems" 
>

export const createOrder =async (request: Request, response: Response) => {
    try {
        const { deliveryAddress, totalPrice, user, orderItems } : CreateOrderType = request.body

        const order = await Order.create ({
            deliveryAddress,
            totalPrice,
            user,
            orderItems
        })
    } catch (error) {
        console.log('An Error Occured while creating order', error)
        response.send({
            message: "Error creating order"
        })
    }
}