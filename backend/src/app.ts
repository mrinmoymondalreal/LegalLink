import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";

import { index } from "./routes/index";
import authRouter from "./routes/auth";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

export const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LegalLink API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "better-auth.session_token",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.set("port", process.env.PORT || 3000);

app.use(logger("dev"));

app.use(authRouter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", index);
