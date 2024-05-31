import express from "express";
import cors from "cors";
import userRouter from "./controllers/user.js";
import booksRouter from "./controllers/books.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use(booksRouter);

export default app;
