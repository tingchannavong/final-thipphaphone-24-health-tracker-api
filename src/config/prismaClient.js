import { PrismaClient } from "@prisma/client/extension";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const adapter = new PrismaMariaDb({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5
});

console.log(adapter);

const prisma = new PrismaClient({adapter});

export default prisma;