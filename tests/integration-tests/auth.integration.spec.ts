import 'jest';
import * as express from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from '../helpers/Integration-helpers';

describe('login integration tests', () => {
    let app: express.Application;

    beforeAll(async () => {
        app = await IntegrationHelpers.getApp();
    });

    it('can login', async () => {
        const response = await request(app)
            .post('/login')
            .send({ username: "user_1@test.com", password: "Abcd1234" })
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.id).toEqual(1);
    });

});