import express, { response } from "express";
import connectToDatabase from './db'
import dotenv from "dotenv"

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000

app.get("/ping", (request, response) => {
    response.send("Server works fine")
})

app.listen(PORT, ()=> {
    console.log("Server is up and running on", PORT)
})