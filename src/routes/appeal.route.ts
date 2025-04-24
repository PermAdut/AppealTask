import { Router } from 'express';
import {
  createAppeal,
  takeAppeal,
  cancelAppeal,
  cancelAllAppealsInProgress,
  getAppealsByDate,
  endAppeal,
} from '../controllers/appeal.controller';
import { parseReqBody } from '../middleware/parseReqBody';
import { parseQuery } from '../middleware/parseQuery';
import { parseParams } from '../middleware/parseParams';

const router = Router();

router.get('/', parseQuery, getAppealsByDate);
router.post('/', parseReqBody, createAppeal);
router.patch('/take/:appealId', parseParams, takeAppeal);
router.patch('/cancel/:appealId', parseParams, cancelAppeal);
router.patch('/cancel-all', cancelAllAppealsInProgress);
router.patch('/end/:appealId', parseParams, endAppeal);

export default router;
