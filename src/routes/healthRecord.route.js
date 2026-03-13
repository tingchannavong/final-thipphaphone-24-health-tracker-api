import express from "express";
import { authCheckUser } from "../middlewares/authCheck.js";
import { createHealthRecordController } from "../controllers/healthRecord.controller.js";

const healthRouter = express.Router();

// check auth for users
healthRouter.use(authCheckUser);

healthRouter.post('/', createHealthRecordController);
healthRouter.get('/', (re, res) => {} );
healthRouter.get('/:id', (re, res) => {}  );
healthRouter.put('/:id', (re, res) => {}  );
healthRouter.delete('/:id', (re, res) => {}  );

export default healthRouter;