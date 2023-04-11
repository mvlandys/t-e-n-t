import { JWTPayload } from "../types/passport.types";
import jwt from 'jsonwebtoken';

const generateToken = (tokenData: JWTPayload, expiry: string) => {
    const jwtSecret = process.env.JWT_SECRET;

    if (jwtSecret === undefined) {
        throw new Error("JWT Secret not configured");
    }

    return jwt.sign(tokenData, jwtSecret, {
        expiresIn: expiry || '7 days'
    });
}

export { generateToken }