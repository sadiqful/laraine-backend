import express, { response } from "express";
import connectToDatabase from './db'
import dotenv from "dotenv"
import cors from 'cors'
import productRoutes from "./routes/product"
import orderRoutes from "./routes/order"
import { webhookHandler } from "./webhook"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000

app.use(cors());

connectToDatabase()

app.post("/webhook", express.raw({ type: 'application/json'}), webhookHandler)

app.use(express.json())
app.use("/orders", orderRoutes)
app.use("/products", productRoutes)

app.get("/ping", (request, response) => {
    response.send("Server works fine")
})

app.listen(PORT, ()=> {
    console.log("Server is up and running on", PORT)
})