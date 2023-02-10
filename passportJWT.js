import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import userService from "./src/services/userService.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET,
};

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await userService.findUserById(jwt_payload.sub)
        done(null, user)
    } catch (err) {
        done(err, false)
    }
});

passport.use(strategy);