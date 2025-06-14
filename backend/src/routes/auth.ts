import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const router = Router();

router.all("/api/auth/{*any}", toNodeHandler(auth));

export default router;
