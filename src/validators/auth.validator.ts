import { check } from 'express-validator';

export default class AuthValidator {
    public loginValidator = () => {
        return [
            check("username").notEmpty().withMessage("Please specify a valid username"),
            check("password").notEmpty().withMessage("Please specify a valid password")
        ];
    };
}