import { Router } from "express";
import { createAppeal } from "../controllers/appeal.controller";

const router = Router();

router.post('/', createAppeal);

export default router;