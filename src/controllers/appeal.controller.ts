import { AppealRepository } from '../repositories/appeal.repository';
import { AppealRequestDto } from '../dto/appealRequest.dto';
import { NextFunction, Request, Response } from 'express';

const appealRepository = new AppealRepository();

export async function createAppeal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeal = await appealRepository.createAppeal(
      req.body as AppealRequestDto,
    );
    res.status(201).json(appeal);
  } catch (error: any) {
    next(error);
  }
}

export async function takeAppeal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeal = await appealRepository.takeAppeal(req.params.appealId);
    res.status(200).json(appeal);
  } catch (error: any) {
    if (error.message === 'Appeal not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Appeal is not new') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
}

export async function cancelAppeal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeal = await appealRepository.cancelAppeal(req.params.appealId);
    res.status(200).json(appeal);
  } catch (error: any) {
    if (error.message === 'Appeal not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Appeal is not in progress') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
}

export async function cancelAllAppealsInProgress(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeals = await appealRepository.cancelAllAppealsInProgress();
    res.status(200).json(appeals);
  } catch (error: any) {
    next(error);
  }
}

export async function getAppealsByDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeals = await appealRepository.findAllByDate(
      req.query.date as string[],
    );
    res.status(200).json(appeals);
  } catch (error: any) {
    next(error);
  }
}

export async function endAppeal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appeal = await appealRepository.endAppeal(req.params.appealId);
    res.status(200).json(appeal);
  } catch (error: any) {
    if (error.message === 'Appeal not found') {
      res.status(404).json({ message: error.message });
    } else if (error.message === 'Appeal is not in progress') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
}
