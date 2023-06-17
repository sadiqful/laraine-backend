import { Request, Response } from "express";
import Order from '../models/order';
import { IOrder, IOrderItem } from "../types";
import stripe from "stripe"

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
})

const BASE_UNIT = 100

const getTotalAmount = (orderItems: IOrderItem[]) => {
    return (
        orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * BASE_UNIT
    )
}

type CreateOrderType = Pick <
    IOrder, "deliveryAddress" | "totalPrice" | "user" | "orderItems" 
>

export const createOrder = async (request: Request, response: Response) => {
    try {
        const { deliveryAddress, totalPrice, user, orderItems } : CreateOrderType = request.body

        const totalAmount = getTotalAmount(orderItems)
        
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: totalAmount,
            currency: "ngn"
        })
        
        const order = await Order.create ({
            deliveryAddress,
            totalPrice,
            user,
            orderItems,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "pending",
            paymentDetails: {}
        })
        response.send({
            clientSecret: paymentIntent.client_secret,
        })
    } catch (error) {
        console.log('An Error Occured while creating order', error)
        response.send({
            message: "Something went wrong while creating order"
        })
    }
}