import { Router } from "express";
import { createAppeal, takeAppeal } from "../controllers/appeal.controller";
import { parseReqBody } from "../middleware/parseReqBody";

const router = Router();

router.post('/', parseReqBody, createAppeal);
router.patch('/take/:appealId', takeAppeal);
export default router;