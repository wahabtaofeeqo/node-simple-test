import { findUser } from "../modules/user/service.js";

export async function auth(req, res, next) {

    /**
     * Check header
     * 
     */
    let auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({
            status: false,
            message: 'Unauthorized'
        });
    }

    /**
     * Extract Auth Info
     * 
     */
    auth = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
    let username = auth[0];
    let password = auth[1];

    /**
     * Get User
     * 
     */
    const user = await findUser({
        seller_id: username,
        seller_zip_code_prefix: password
    });

    if (!user) {
        res.status(401).json({
            status: false,
            message: 'Unauthorized'
        });
    }

    //
    res.locals = {user};
    next();
}
