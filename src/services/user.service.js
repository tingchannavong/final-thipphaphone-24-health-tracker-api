import prisma from "../config/prismaClient.js";

export async function findUserByUsername(username) {
    const user = await prisma.user.findUnique(
        {
            where: {username}
        });
    return user;
}