export interface IProduct {
    _id: string
    name: string 
    description: string 
    price: number 
    image: string 
    createdAt: string 
    updatedAt: string
}

export interface IUser {
    name: string 
    email: string 
}

export interface IDeliveryAddress {
    address: string 
    city: string
}

export interface IOrderItem {
    name: string 
    quantity: number
    image: string 
    price: number 
    product: string 
}

export interface IOrder {
    _id: string 
    user: IUser 
    deliveryAddress: IDeliveryAddress
    orderItems: IOrderItem[]
    totalPrice: number
    createdAt: string
    updatedAt: string
    paymentDetails: {}
    paymentIntentId: string
    paymentStatus: string
}