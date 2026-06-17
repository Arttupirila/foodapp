import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoDB_URI = process.env.MONGODB_URI


const client = new MongoClient(mongoDB_URI);

let db

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db("foodapp");
        console.log("Connected to MongoDB");
    }
    return db;
}

    

export default connectDB;
