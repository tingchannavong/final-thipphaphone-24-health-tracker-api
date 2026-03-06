import prisma from "../config/prismaClient.js";

export async function findDoctorByUsername(username) {
    const doctor = await prisma.doctor.findUnique(
        {
            where: {username}
        });
    return doctor;
}

