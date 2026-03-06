import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import createError from "http-errors";


export async function findUserByUsername(username) {
    const user = await prisma.user.findUnique(
        {
            where: {username}
        });
    return user;
}

export async function findUserById(id) {
    const user = await prisma.user.findUnique(
        {
            where: {id}
        });
    return user;
}

export async function updateUser(id, username, password) {
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