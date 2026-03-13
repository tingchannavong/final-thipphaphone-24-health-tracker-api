import { createUserHealthRecord } from "../services/healthRecord.service.js";
import createError from "http-errors";

export async function createHealthRecordController(re, res) {
    const {id} = re.userData;

    const {type, value} = re.body;

    const healthRecord = await createUserHealthRecord(id, type, value);

    res.json({message: "health record added successfully",
        healthRecord
    });
}