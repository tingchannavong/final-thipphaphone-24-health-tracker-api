import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import createError from "http-errors"

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

export async function updateDoctor(id, username, password, specialization) {
    const hashedPassword = await bcrypt.hash(password, 6);

    const updatedDoctor = await prisma.doctor.update(
        {
            where: {id},
            data: {
                username,
                password: hashedPassword,
                specialization
            }
        });
    return updatedDoctor;
}