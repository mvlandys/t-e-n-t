import bcrypt from 'bcryptjs';
import passport from 'passport';
import * as express from 'express';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JWTPayload } from '../types/passport.types';

const jwtSecret = process.env.JWT_SECRET

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, async (req: express.Request, username: string, password: string, done: VerifiedCallback) => {
    try {
        // Lookup user
        const user = await User.findOne({ where: { username: username } });

        // Return error if not found
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

/**
 * Passport JWT Config
 */
passport.use(new JWTstrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    passReqToCallback: true
}, async (req: express.Request, jwtPayload: JWTPayload, done: VerifiedCallback) => {
    try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

const protectedRoute = passport.authenticate('jwt', { session: false });

export { passport, protectedRoute };