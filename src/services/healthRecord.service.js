import prisma from "../config/prismaClient.js";

export async function createUserHealthRecord(userId, type, value) {

    const healthRecord = await prisma.healthRecord.create({
        data: {
            userId,
            type,
            value
        }
    });
    return healthRecord;
}