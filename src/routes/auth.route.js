import express from "express";
import registerRouter from "./register.route.js";
import loginRouter from "./login.route.js";

const authRouter = express.Router();

// nested routes
authRouter.use('/register', registerRouter);
authRouter.use('/login', loginRouter);

export default authRouter;



