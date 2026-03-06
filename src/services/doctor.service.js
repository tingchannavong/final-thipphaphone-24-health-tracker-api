import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

export async function findDoctorByUsername(username) {
    const doctor = await prisma.doctor.findUnique(
        {
            where: {username}
        });
    return doctor;
}

export async function findDoctorById(id) {
    const user = await prisma.doctor.findUnique(
        {
            where: {id}
        });
    return user;
}

export async function updateDoctor(id, {username, password, specialization}) {
    // check if username exist, if yes throw error
    const doctorExist = await findDoctorById(id);
    if (doctorExist) {
        throw createError(400, 'username already exist')
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    const updatedUser = await prisma.user.update(
        {
            where: {id},
            data: {
                username,
                password: hashedPassword
            }
        });
    return updatedUser;
}