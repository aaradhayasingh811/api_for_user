import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connection = async()=>{
 const mainconnect = await mongoose.connect(`${process.env.MONGODB_URI}/blog`).then(()=>{
    console.log("Database connection established");
    
}).catch((err)=>{
    console.log("Error connecting to MongoDB")
    process.exit(1);
})

}
    
export {connection}