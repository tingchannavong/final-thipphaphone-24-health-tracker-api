import express from "express";
import { doctorLoginController, userLoginController } from "../controllers/auth.controller.js";

const loginRouter = express.Router();

//final destination of nested route
loginRouter.post('/doctor', doctorLoginController);
loginRouter.post('/user',  userLoginController);

export default loginRouter;