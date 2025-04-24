import { Router } from "express";
import { createAppeal, takeAppeal, cancelAppeal, cancelAllAppealsInProgress } from "../controllers/appeal.controller";
import { parseReqBody } from "../middleware/parseReqBody";

const router = Router();

router.post('/', parseReqBody, createAppeal);
router.patch('/take/:appealId', takeAppeal);
router.patch('/cancel/:appealId', cancelAppeal);
router.patch('/cancel-all', cancelAllAppealsInProgress);
export default router;