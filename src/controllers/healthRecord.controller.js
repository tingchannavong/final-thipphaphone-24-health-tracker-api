import { findDoctorById } from "../services/doctor.service.js";
import { createUserHealthRecord, getAllHealthRecord, getHealthRecordsBy, getHealthRecordsByDate } from "../services/healthRecord.service.js";
import createError from "http-errors";

export async function createHealthRecordController(re, res) {
    const {id} = re.userData;

    const {type, value} = re.body;

    const data = await createUserHealthRecord(id, type, value);

    res.json({message: "health record added successfully",
        data
    });
}

export async function getHealthRecordController(re, res) {
    // validation
    const {id} = re.doctorData;
    const doctorExist = await findDoctorById(id);
    if (!doctorExist) {throw createError(400, 'invalid user id')}

    let records;

    const {type, from ,to} = re.query;

    // case query by both date and type
    if (type && from && to) {
        const dataFilterByDate = await getHealthRecordsByDate(from, to);
        records = dataFilterByDate.filter( record => record.type === type)
    } else if (type) {
         // case query by type only
        records = await getHealthRecordsBy('type', type);
    } else if (from && to) {
        // case query by from to date only
        records = await getHealthRecordsByDate(from, to);
    } else {
          // get all data
        records = await getAllHealthRecord()
    }

    res.json({success: true,
            data: records
        });
}
