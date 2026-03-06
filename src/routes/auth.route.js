import express from "express";
import registerRouter from "./register.route.js";
import loginRouter from "./login.route.js";

const authRouter = express.Router();

// all of these should use validation middleware, username exist etc.
// below lead to nested routes
authRouter.use('/register', registerRouter);
authRouter.use('/login', loginRouter);

export default authRouter;



