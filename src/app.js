import express from "express";
import "dotenv/config"
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (re, res) => {
    res.send('Welcome to Health Tracker API');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});