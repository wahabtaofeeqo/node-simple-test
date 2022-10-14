import { config } from "dotenv";
import { MongoClient } from "mongodb";

//
config()
export async function DBConnection() {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.DB_URL);
        await mongoClient.connect();
        return mongoClient.db(process.env.DB_NAME);
    } 
    catch (error) {
        console.error('Connection failed!', error);
        process.exit();
    }
 }