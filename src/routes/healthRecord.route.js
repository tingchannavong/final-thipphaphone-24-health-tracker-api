import express from "express";
import { authCheckDoctor, authCheckUser } from "../middlewares/authCheck.js";
import { createHealthRecordController, deleteRecordController, getHealthRecordController, getRecordController, updateRecordController } from "../controllers/healthRecord.controller.js";

const healthRouter = express.Router();

// only this route check doctor auth
healthRouter.get('/', authCheckDoctor, getHealthRecordController);

// check auth for users for below routes
healthRouter.use(authCheckUser);

healthRouter.post('/', createHealthRecordController);
healthRouter.get('/:id', getRecordController);
healthRouter.put('/:id', updateRecordController);
healthRouter.delete('/:id', deleteRecordController);

export default healthRouter;