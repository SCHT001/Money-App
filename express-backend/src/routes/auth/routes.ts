import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { providerSignIn, signIn } from "./controller";
const prisma = new PrismaClient();
const router = Router();

router.post("/signIn", async (req, res) => {
	return signIn(req, res);
});

router.post("/provider/signIn", (req, res) => {
	return providerSignIn(req, res);
});

export default router;
