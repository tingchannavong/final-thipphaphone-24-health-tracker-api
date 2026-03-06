import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

export async function findDoctorByUsername(username) {
    const doctor = await prisma.doctor.findUnique(
        {
            where: {username}
        });
    return doctor;
}

export async function registerDoctor(username, password, specialization) {
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