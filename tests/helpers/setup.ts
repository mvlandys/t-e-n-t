import 'jest';
import AppDataSource from '../../src/database/datasource.database';
import IntegrationHelpers from './Integration-helpers';
import { stopWebServer } from '../../src/config/webserver.config';
import { execSync } from "child_process";

beforeAll(async () => {
    await AppDataSource.initialize();
    await IntegrationHelpers.getApp();
    execSync('ts-node ./src/database/seeder.database.ts ./src/database/seeds/testdata.seeder.ts');
});

afterAll(async () => {
    await AppDataSource.destroy();
    await stopWebServer();
});