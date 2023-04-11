import * as express from 'express';
import { IApplication, initializeWebServer } from '../../src/config/webserver.config';

class IntegrationHelpers {
    public static appInstance: express.Express;
    public static token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMTgwMTI4LCJleHAiOjE2ODE3ODQ5Mjh9.pGh0LevH9eKBI2SFCiP3kRkv8EK0oODzQrZELZp0_yE';

    public static async getApp(): Promise<express.Application> {
        if (this.appInstance) {
            return this.appInstance;
        }

        const app: IApplication = await initializeWebServer(5001);
        this.appInstance = app.app;

        return this.appInstance;
    }

    public clearDatabase(): void {
        console.info('clear the database');
    }
};

export default IntegrationHelpers;