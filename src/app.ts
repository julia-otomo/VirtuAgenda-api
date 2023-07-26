import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleError from "./middlewares/handleErrors.middleware";
import cors from "cors";
import userRouter from "./routes/user.routes";
import contactRouter from "./routes/contact.routes";
import sessionRouter from "./routes/session.routes";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use("/users", userRouter);
app.use("/contacts", contactRouter);
app.use("/login", sessionRouter);

app.use(handleError);

export default app;
