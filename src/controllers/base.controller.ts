import * as express from 'express';
import { validationResult } from "express-validator";

class BaseController {
    /**
     * Validate HTTP Request
     * @param request 
     * @param response 
     * @returns boolean
     */
    protected validateRequest(request: express.Request, response: express.Response): boolean {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            response.status(422).json({ errors: errors.array().map(i => i.msg) });
            return false;
        } else {
            return true;
        }
    }

    /**
     * Create a standard JSON error response
     * @param response 
     * @param errors 
     * @returns 
     */
    protected errorResponse(response: express.Response, errors: string[]): express.Response {
        return response.status(500).json({ errors: errors });
    }
}

export default BaseController;