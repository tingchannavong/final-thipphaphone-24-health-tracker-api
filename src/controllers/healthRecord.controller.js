import { findDoctorById } from "../services/doctor.service.js";
import { createUserHealthRecord, deleteHealthRecordById, getAllHealthRecord, getHealthRecordsBy, getHealthRecordsByDate, getUniqueHealthRecordBy, updateHealthRecordsById } from "../services/healthRecord.service.js";
import createError from "http-errors";
import { findUserById } from "../services/user.service.js";

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

export async function getRecordController(re, res, next) {
     // validation
    const userId = re.userData.id;
    const userExist = await findUserById(userId);
    if (!userExist) {throw createError(400, 'invalid user id')}

    const {id} = re.params;

    try {
         const data = await getUniqueHealthRecordBy('id', Number(id));

         if (!data) { next(createError(400, 'record not exist'))}

        res.json({success: true,
            data
        });
    } catch (error) {
        console.log(error)
    }
}

export async function updateRecordController(re, res) {
    // validation
    const userId = re.userData.id;
    const userExist = await findUserById(userId);
    if (!userExist) {throw createError(400, 'invalid user id')}

    const {id} = re.params;

    if (!re.body) { throw createError(400, 'body cant be empty')}
    // console.log(re.body);

    try {
        const data = await updateHealthRecordsById(Number(id), re.body);
        res.json({success: true,
        data
        });
    } catch (error) {
        console.log(error)
    }
}

export async function deleteRecordController(re, res) {
    // validation
    const userId = re.userData.id;
    const userExist = await findUserById(userId);
    if (!userExist) {throw createError(400, 'invalid user id')}

    const {id} = re.params;

    const result = await deleteHealthRecordById(Number(id));

    res.json({success: true,
       result
    });
}
