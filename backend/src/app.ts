import express from "express";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

import { index } from "./routes/index";
import authRouter from "./routes/auth";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", index);
app.use(authRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);
