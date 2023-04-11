// Load environmental variables
import dotenv from 'dotenv';
dotenv.config();

import AppDataSource from './src/database/datasource.database';
import { initializeWebServer } from './src/config/webserver.config';
import handleError from './src/helpers/errors.helpers';

// Handle application errors
process.on('uncaughtException', (error) => handleError(error));
process.on('unhandledRejection', (reason) => handleError(reason));

// Setup the web server
const start = async () => {
    await AppDataSource.initialize();
    const webserver = await initializeWebServer();

    return webserver;
};

// Start the web server
start()
    .then((server: any) => {
        console.log('The app has started successfully', server.http.address());
    })
    .catch((error) => {
        console.log('App occured during startup', error);
    });