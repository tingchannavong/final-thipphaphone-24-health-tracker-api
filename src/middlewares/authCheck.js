import { verifyToken } from "../utils/jwt.js";
import createError from "http-errors";
import "dotenv/config";

export function authCheckUser(re, res, next) {
    // get token from header
    const token = re.headers?.authorization.split(' ')[1];

    if (!token) {
        throw createError(401, "Unauthorized");
    }

    try {
        // verify token with jwt
        const payload = verifyToken(token, process.env.JWT_SECRET_USER);
        
        // send payload onwards
        re.userData = payload;

        // if success go ahead
        next();
    } catch (error) {
        // if fail throw error
        next(error);
    }
}

export function authCheckDoctor(re, res, next) {
    const token = re.headers?.authorization.split(' ')[1];
    console.log(token);
    if (!token) {
        throw createError(401, "Unauthorized");
    }

    try {
        const payload = verifyToken(token, process.env.JWT_SECRET_DOCTOR);
        console.log(payload);
        re.doctorData = payload;
        next();
    } catch (error) {
        next(error);
    }    
}