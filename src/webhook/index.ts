import { Request, Response } from "express";
import Order from "../models/order";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15"
})

export const webhookHandler =async (request: Request, response: Response) => {
    
    try {
        const sig = request.header["stripe-signature"] as string
        const event = stripeClient.webhooks.constructEvent(
            request.body, 
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        if(event.type === "charge.succeeded") {
            const charge = event.data.object as stripe.Charge
            const order = await Order.findOne({
                paymentIntentId: charge.payment_intent,
            })
    
            if(order) {
                order.paymentStatus = "paid"
                order.paymentDetails = charge 
                order.save()
            }
        } else if (event.type === "charge.failed") {
            const charge = event.data.object as stripe.Charge
            const order = await Order.findOne({
                paymentIntentId: charge.payment_intent,
            })
    
            if(order) {
                order.paymentStatus = "failed"
                order.paymentDetails = charge
                order.save()
            }
        }
    
    response.send({
        recieved: true,
    })
    } catch (error) {
        console.log("Error in webhookHanlder", error)
        throw error
    }

}