import { Router } from "express";
import { createAppeal, takeAppeal, cancelAppeal } from "../controllers/appeal.controller";
import { parseReqBody } from "../middleware/parseReqBody";

const router = Router();

router.post('/', parseReqBody, createAppeal);
router.patch('/take/:appealId', takeAppeal);
router.patch('/cancel/:appealId', cancelAppeal);
export default router;