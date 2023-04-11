import * as express from 'express';
import BaseController from './base.controller';
import { User } from '../entities/user.entity';
import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/user.repository';

class UserController extends BaseController {
    /**
     * List all users
     * GET: /users
     */
    public getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        // Validate Request
        if (!this.validateRequest(request, response)) {
            return;
        }

        const userRep = new UserRepository();
        const users = await userRep.getAllUsers();

        return response.send({ users: users });
    };

    /**
     * New User
     * POST: /users
     */
    public newUser = async (request: express.Request, response: express.Response) => {
        // Validate Request
        if (!this.validateRequest(request, response)) {
            return;
        }

        const user = new User();
        user.username = request.body.username;
        user.password = await bcrypt.hash(request.body.password, 10);
        await user.save();

        return response.send({ user: user });
    };
}

export default UserController;