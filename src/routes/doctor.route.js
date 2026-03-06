import express from "express";
import { authCheckDoctor } from "../middlewares/authCheck.js";
import { getDoctorController, updateDoctorController } from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

// middleware for all routes below so far
doctorRouter.use(authCheckDoctor);
doctorRouter.get('/me', getDoctorController);
doctorRouter.put('/me', updateDoctorController);

export default doctorRouter;