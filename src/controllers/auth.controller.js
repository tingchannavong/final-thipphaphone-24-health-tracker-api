import createError from "http-errors"
import { findDoctorByUsername, registerDoctor } from "../services/auth.service.js";

export async function doctorRegisterController(re, res, next) {
    // bonus validation in middleware, username not empty etc.
    // get body
    const {username, password, specialization} = re.body;

    // check if doctor  exist, if yes throw error
    const doctorExist = await findDoctorByUsername(username);
    if (doctorExist) {
        throw createError(400, 'username already exist')
    }

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

export function userRegisterController(re, res) {
    res.send('user register control');
}