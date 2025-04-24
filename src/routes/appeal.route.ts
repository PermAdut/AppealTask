import { Router } from "express";
import { createAppeal, takeAppeal, cancelAppeal, cancelAllAppealsInProgress, getAppealsByDate } from "../controllers/appeal.controller";
import { parseReqBody } from "../middleware/parseReqBody";
import { parseQuery } from "../middleware/parseQuery";

const router = Router();

router.post('/', parseReqBody, createAppeal);
router.patch('/take/:appealId', takeAppeal);
router.patch('/cancel/:appealId', cancelAppeal);
router.patch('/cancel-all', cancelAllAppealsInProgress);
router.get('/', parseQuery, getAppealsByDate);
export default router;