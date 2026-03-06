import jwt from "jsonwebtoken";

export function generateToken(payload, secret, time) {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: time
    });
    return token;
}