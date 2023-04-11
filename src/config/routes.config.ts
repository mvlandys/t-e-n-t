import * as express from 'express';
import { protectedRoute } from './passport.config';

// Import Controllers
import UserController from '../controllers/user.controller';
import AuthController from '../controllers/auth.controller';

// Import Validators
import UserValidator from '../validators/user.validator';
import AuthValidator from '../validators/auth.validator';

const defineRoutes = () => {
    const router = express.Router();

    // Default Route
    router.get("/", (req: express.Request, res: express.Response) => res.send("API Server"));

    // Authentication Routes
    const authController = new AuthController();
    const authValidator = new AuthValidator();
    router.post("/login", authValidator.loginValidator(), authController.login);

    // User Routes
    const userController = new UserController();
    const userValidator = new UserValidator();
    router.get("/users", userController.getAllUsers);
    router.post("/users", [protectedRoute, userValidator.newUserValidator()], userController.newUser);

    return router;
}

export default defineRoutes;