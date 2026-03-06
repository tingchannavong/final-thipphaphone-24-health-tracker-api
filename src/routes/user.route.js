import express from "express";
import { getMeController, updateMeController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get('/me', getMeController);
userRouter.put('/me',  updateMeController);

export default userRouter;