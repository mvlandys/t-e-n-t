import * as express from 'express';
import * as http from 'http';
import cors from "cors";
import bodyParser from "body-parser";
import passport from 'passport';
import defineRoutes from './routes.config';
import { IApplication } from '../types/application.types';

// Variable for web server connection
let connection: http.Server;

// Web Server Middleware (runs on every request)
const appMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        console.log(req.method, res.statusCode, req.originalUrl);
    }

    next();
};

// Express error middleware
const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(500).send({ errors: [err.message] });
}

/**
 * Start the express web server
 * @returns Promise
 */
const initializeWebServer = (port: Number | null = 5000): Promise<IApplication> => {
    return new Promise((resolve, reject) => {
        const app = express.default();
        const routes = defineRoutes();

        app.use(cors({
            origin: ["*"],
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            credentials: true
        }));

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(passport.initialize());
        app.use(appMiddleware);
        app.use(routes);
        app.use(errorHandler);

        const webServerPort = (port === null && !process.env.PORT) ? process.env.PORT : port;
        connection = app.listen(webServerPort, () => {
            const application: IApplication = { app: app, http: connection };
            resolve(application);
        });
    });
}

/**
 * Stop the express web server
 * @returns Promise
 */
const stopWebServer = () => {
    return new Promise((resolve, reject) => {
        connection.close(() => {
            resolve(null);
        });
    });
};

export { initializeWebServer, stopWebServer, IApplication };