import express from 'express';
import { auth } from './middleware/auth.js';
import routers from './routers.js';
import cors from 'cors';

/**
 * Create app
 * 
 */
const app = express();

app.use(cors())
app.use(express.json());

/**
 * Endpoints
 * 
 */
 app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'You are on the right track!'
    })
});
app.use('/api/v1', auth, routers);


/**
 * 404
 */
app.use((req, res, next) => {
    const error = new Error();
    error.message = 'Not Found';
    error.status = 404;
    next(error);
});

/**
 * Error
 */
app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        ...error,
        error: true
    });
});

export default app;