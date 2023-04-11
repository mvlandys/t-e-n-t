import * as express from 'express';
import * as http from 'http';

interface IApplication {
    app: express.Express,
    http: http.Server
};

export { IApplication };