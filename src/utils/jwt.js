import jwt from "jsonwebtoken";

export function generateToken(payload, secret, time) {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: time
    });
    return token;
}

export function verifyToken(token, secret) {
    const decode = jwt.verify(token, secret, {
        algorithms: ["HS256"]
    });
    return decode;
}