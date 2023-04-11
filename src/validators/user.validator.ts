import { check } from 'express-validator';

class UserValidator {
    public newUserValidator = () => {
        return [
            check("username").notEmpty().withMessage("Please specify a valid username"),
            check("password").notEmpty().withMessage("Please specify a valid password")
        ];
    };
}

export default UserValidator;