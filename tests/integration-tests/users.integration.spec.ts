import 'jest';
import * as express from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('user integration tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });

    it('can list users', async () => {
        const response = await request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);

        expect(response.body).toHaveProperty('users');
        expect(response.body.users).toHaveLength(3);
    });

    it('can create user', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                username: "tester",
                password: "whatever"
            })
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + IntegrationHelpers.token)
            .expect(StatusCodes.OK);
    });
});