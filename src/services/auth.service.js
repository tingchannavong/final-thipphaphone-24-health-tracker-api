import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import createError from "http-errors"
import { generateToken } from "../utils/jwt.js";
import { findDoctorByUsername } from "./doctor.service.js";
import { findUserByUsername } from "./user.service.js";
import "dotenv/config";

export async function registerDoctor(username, password, specialization) {
    // check if doctor  exist, if yes throw error
    const doctorExist = await findDoctorByUsername(username);
    if (doctorExist) {
        throw createError(400, 'username already exist')
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    const newDoctor = await prisma.doctor.create({
        data: {
        username,
        password: hashedPassword,
        specialization
    }
});
    return newDoctor;
}

export async function registerUser(username, password) {
    // check if doctor exist, if yes throw error
    const userExist = await findUserByUsername(username);
    if (userExist) {
        throw createError(400, 'username already exist')
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = await prisma.user.create({
        data: {
        username,
        password: hashedPassword
    }
});
    return newUser;
}

export async function doctorLogin(username, password) {
    // check that username exist, if not throw error
    const doctorExist = await findDoctorByUsername(username);
    if (!doctorExist) {
        throw createError(400, 'Invalid credentials');
    }

    // bcrypt check password
    const isMatch = await bcrypt.compare(password, doctorExist.password)

    if (!isMatch) {
        throw createError(400, 'Invalid credentials');
    }

    // create payload
    const doctor = {
        id: doctorExist.id,
        username: doctorExist.username,
        specialization: doctorExist.specialization
    }

    // create token
    const token = generateToken(doctor, process.env.JWT_SECRET_DOCTOR, "30d");

    return {token, doctor};
}

export async function userLogin(username, password) {
    // check that username exist, if not throw error
    const userExist = await findUserByUsername(username);
    if (!userExist) {
        throw createError(400, 'Invalid credentials');
    }

    // bcrypt check password
    const isMatch = await bcrypt.compare(password, userExist.password)

    if (!isMatch) {
        throw createError(400, 'Invalid credentials');
    }

    // create payload
    const user = {
        id: userExist.id,
        username: userExist.username
    }

    // create token
    const token = generateToken(user, process.env.JWT_SECRET_USER, "30d");

    return {token, user};
}

