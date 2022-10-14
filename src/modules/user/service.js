import { DBConnection } from "../../db/connect.js"

const collectionName = 'sellers';

/**
 * 
 * @param {*} option
 */
export const findUser = async (option) => {
    const db = await DBConnection();
    return db.collection(collectionName).findOne(option);
}
