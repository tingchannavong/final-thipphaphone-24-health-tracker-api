import prisma from "../config/prismaClient.js";
import { findDoctorById } from "./doctor.service.js";
import createError from "http-errors";

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

export async function getAllHealthRecord() {

    const healthRecords = await prisma.healthRecord.findMany();
    return healthRecords;
}

export async function getHealthRecordsByDate(from, to) {
    const filteredDateData = await prisma.healthRecord.findMany({
        where: {
            date: {
                gte: new Date(from),
                lte: new Date(to)
            }
        }
    });
    return filteredDateData
}

export async function getHealthRecordsBy(field, value) {
    const filteredData= await prisma.healthRecord.findMany({
        where: { [field]: value }
    });
    return filteredData
}

export async function getUniqueHealthRecordBy(field, value) {
    const filteredData= await prisma.healthRecord.findUnique({
        where: { [field]: value }
    });
    return filteredData
}


export async function updateHealthRecordsById(id, fields) {
    // create data
    let data = {};
    
    if (fields.type) {data.type = fields.type};
    if (fields.value) {data.value = fields.value};

    const filteredData= await prisma.healthRecord.update({
        where: { id },
        data: data
    });
    return filteredData
}

export async function deleteHealthRecordById(id) {

    const result = await prisma.healthRecord.delete({
        where: { id }
    });
    return result
}

