import express from "express";
import {doctorRegisterController, userRegisterController} from "../controllers/auth.controller.js"

const registerRouter = express.Router();

//final destination of nested route
registerRouter.post('/doctor', doctorRegisterController);
registerRouter.post('/user', userRegisterController);

export default registerRouter;