import createError from "http-errors";
import { registerDoctor, registerUser, doctorLogin, userLogin } from "../services/auth.service.js";

export async function doctorRegisterController(re, res, next) {
    // bonus validation in middleware, username not empty etc. reusable
    const {username, password, specialization} = re.body;

    try {
        // use prisma create service
        const newDoctor = await registerDoctor(username, password, specialization);
        delete newDoctor.password;
        res.status(201).json({
            success: true,
            message: "Doctor registered successfully",
            data: newDoctor
        });
    } catch (error) {
        next(error);
    }
}

export async function userRegisterController(re, res, next) {
     // bonus validation in middleware, username not empty etc.
    const {username, password} = re.body;

    try {
        const newUser = await registerUser(username, password);
        delete newUser.password;
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
}

export async function doctorLoginController(re, res, next) {
    const {username, password} = re.body;

    try {
        const result = await doctorLogin(username, password);
       
        res.status(200).json({
            success: true,
            token: result.token,
            doctor: result.doctor
        });
    } catch (error) {
        next(error);
    }
}

export async function userLoginController(re, res, next) {
       const {username, password} = re.body;

    try {
        const {token, user} = await userLogin(username, password);
       
        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        next(error);
    }
}