import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

export const index = Router();

index.all("/api/auth/{*any}", toNodeHandler(auth));
