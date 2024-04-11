import { Router } from "express";
import auth from "./auth/routes";
import user from "./user/routes";
const router = Router();

router.use("/user", user);

router.use("/auth", auth);

export default router;
