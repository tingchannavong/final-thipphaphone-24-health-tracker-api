import express from "express";
import { authCheckDoctor, authCheckUser } from "../middlewares/authCheck.js";
import { createHealthRecordController, getHealthRecordController } from "../controllers/healthRecord.controller.js";

const healthRouter = express.Router();

// only this route check doctor auth
healthRouter.get('/', authCheckDoctor, getHealthRecordController);

// check auth for users for below routes
healthRouter.use(authCheckUser);

healthRouter.post('/', createHealthRecordController);
healthRouter.get('/:id', (re, res) => {}  );
healthRouter.put('/:id', (re, res) => {}  );
healthRouter.delete('/:id', (re, res) => {}  );

export default healthRouter;