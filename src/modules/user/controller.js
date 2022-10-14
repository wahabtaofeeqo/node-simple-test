import { DBConnection } from "../../db/connect.js"

const db = await DBConnection();
const collectionName = 'sellers';

export const profile = (req, res) => {
    res.json({
        status: true,
        message: 'User',
        data: res.locals
    })
}

export const updateAccount = async (req, res) => {
    
    // Update
    await db.collection(collectionName).updateOne({id: res.locals.id}, {
        $set: {seller_city: req.body.city, seller_state: req.body.state}
    });

    //
    const user = await db.collection(collectionName).findOne({id: res.locals.id});

    //
    res.json({
        status: true,
        message: 'Account updated',
        data: user
    })
}