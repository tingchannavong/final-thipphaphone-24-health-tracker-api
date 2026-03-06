import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";

export async function findUserByUsername(username) {
    const user = await prisma.user.findUnique(
        {
            where: {username}
        });
    return user;
}

export async function updateUser(id, username, password) {
    // check if username exist, if yes throw error
    const userExist = await findUserByUsername(username);
    if (userExist) {
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