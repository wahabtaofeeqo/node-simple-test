import { DBConnection } from "../db/connect.js";
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { config } from "dotenv";

config();
export const importData = async () => {

    /**
    * Check import
    * 
    */
    const db = await DBConnection();
    const users = await db.collection('sellers').countDocuments();
    const orders = await db.collection('orders').countDocuments();
    const products = await db.collection('products').countDocuments();
 
    // Sellers
    if(!users.length) {
        const results = [];
        fs.createReadStream('data/olist_sellers_dataset.csv')
            .pipe(csvParser()).on('data', (data) => results.push(data))
            .on('end', () => {
               db.collection('sellers').insertMany(results)
            });
    }
 
    // Orders
    if(!orders) {
        const results = [];
        fs.createReadStream('data/olist_order_items_dataset.csv')
        .pipe(csvParser()).on('data', (data) => results.push(data))
        .on('end', () => {
           db.collection('orders').insertMany(results)
        });
    }
 
    // Products
    if(!products) {
        const results = [];
        fs.createReadStream('data/olist_products_dataset.csv')
        .pipe(csvParser()).on('data', (data) => results.push(data))
        .on('end', () => {
          db.collection('products').insertMany(results)
        });
    }
}