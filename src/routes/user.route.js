import express from "express";
import { getMeController, updateMeController } from "../controllers/user.controller.js";
import { authCheckUser } from "../middlewares/authCheck.js";

const userRouter = express.Router();

// middleware for all routes below so far
userRouter.use(authCheckUser);
userRouter.get('/me', getMeController);
userRouter.put('/me',  updateMeController);

export default userRouter;