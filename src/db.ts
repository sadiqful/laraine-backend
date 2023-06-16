import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const connnection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Connection Established')
    } catch (error) {
        console.log('Error in connecting to the Database', error)
        throw error
    }
}

export default connectToDatabase