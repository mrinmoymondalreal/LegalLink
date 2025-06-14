import express from "express";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

import { index } from "./routes/index";
import authRouter from "./routes/auth";

export const app = express();

app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use(authRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);
