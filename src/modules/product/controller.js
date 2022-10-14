import { ObjectId, ObjectID } from "mongodb";
import { DBConnection } from "../../db/connect.js";

const collectionName = 'products';
const db = await DBConnection()

//
export const listAll = async (req, res) => {

    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 20;
    const offset = page * limit;
    
    // Count
    const total = await db.collection(collectionName).countDocuments();

    // Load 
    const data = await db.collection(collectionName)
        .find({}).skip(offset).limit(limit).toArray();

    //
    res.json({
        status: true,
        message: 'Products',
        data: {
            data,
            limit,
            offset,
            total,
            page
        }
    })
}

export const deleteProduct = async (req, res) => {

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

export const updateProduct = async (req, res) => {
    
    const body = req.body;

    // Prep
    const data = {
        product_name_lenght: body.name,
        product_description_lenght: body.desc,
        product_weight_g: body.weight,
        price: body.price
    }

    // Update
    const {modifiedCount} = await db.collection(collectionName)
    .updateOne({product_id: req.params.id}, {
        $set: data
    });

    const product = await db.collection(collectionName).findOne({
        product_id: req.params.id
    });

    //
    res.json({
        status: true,
        message: 'Product updated',
        data: product
    })
}