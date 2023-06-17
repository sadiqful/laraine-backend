import { Request, Response } from "express";
import Product from "../models/product";
import { IProduct } from "../types";

type CreateProductType = Pick <
    IProduct, "name" | "description" | "image" | "price"
>

export const createProduct = async (request: Request, response: Response) => {
    try {

        const { name, description, image, price } : CreateProductType = request.body

        const product = await Product.create({
            name,
            description,
            image,
            price
        })
        response.send(product)
        
    } catch (error) {
        console.log("Error in creating product", error)
        response.send({
            message: "Something went wrong while creating product"
        })

        throw error 
    }
}