import * as http from 'http';
import app from './app.js';
import { config } from 'dotenv';
import { importData } from './config/import.js';

//
config();

/**
 * Do import
 * 
 */
importData();


/**
 * Create Server
 * 
 */
const server = http.createServer(app);

/**
 * Server Port
 * 
 */
 const PORT = process.env.PORT || 5000;

// Start
server.listen(PORT, () => {console.log(`Server is on PORT ${PORT}`)});