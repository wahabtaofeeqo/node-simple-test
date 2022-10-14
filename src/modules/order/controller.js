import { ObjectID } from "mongodb";
import { DBConnection } from "../../db/connect.js";

const collectionName = 'orders';
const db = await DBConnection()

//
export const listAll = async (req, res) => {

    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 20;
    const offset = page * limit;
    
    let sort = {shipping_limit_date: 1};
    if (req.query.sort) {
        sort = { price: 1 }
    }
    
    // Filter
    const clause = {
        seller_id: res.locals.seller_id
    }

    // Count User Orders
    const total = await db.collection(collectionName).countDocuments(clause);

    // Load Orders
    const data = await db.collection(collectionName)
        .find(clause).skip(offset).limit(limit).sort(sort).toArray();

    //
    res.json({
        status: true,
        message: 'Orders',
        data: {
            data,
            limit,
            offset,
            total
        }
    })
}

export const deleteOrder = async (req, res) => {

    // Find order
    const {deletedCount} = await db.collection(collectionName).deleteOne({
        _id: ObjectID(req.params.id)
    });

    if(!deletedCount) {
        res.status(400).json({
            status: false,
            message: 'Order Item not deleted'
        });
    }
    else {
        res.json({
            status: true,
            message: 'Order Deleted Successfully'
        })
    }
}