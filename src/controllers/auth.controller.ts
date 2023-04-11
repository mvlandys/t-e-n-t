import passport from 'passport';
import * as express from 'express';
import BaseController from "./base.controller";
import { generateToken } from '../utils/auth.utils';
import { User } from '../entities/user.entity';

export default class AuthController extends BaseController {
    /**
     * User Login
     * POST /login
     */
    public login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
        try {
            passport.authenticate('login', (err: Error, user: User | null, info: { message: string } | undefined) => {
                if (err) {
                    res.status(400).send({ errors: [err.message] });
                    return;
                }
                if (info != undefined) {
                    res.status(400).send({ errors: [info.message] });
                    return;
                }

                if (user == null) {
                    res.status(400).send({ errors: ['User not found'] });
                    return;
                }

                const token = generateToken({ id: user.id }, '7 days');

                return res.json({ token, user });
            }
            )(req, res, next);
        } catch (err) {
            console.error('failed loggin in user: ', req.body, '\nError message: ', err);
            res.sendStatus(400);
        }
    };
}
