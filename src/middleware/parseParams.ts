import { NextFunction } from 'express';
import { Request, Response } from 'express';

export function parseParams(req: Request, res: Response, next: NextFunction) {
  try {
    const appealId = req.params.appealId;
    if (!appealId) {
      throw new Error('Appeal ID is required');
    }
    if (typeof appealId !== 'string') {
      throw new Error('Appeal ID must be a string');
    }
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!regex.test(appealId)) {
      throw new Error('Invalid appeal ID');
    }
    next();
  } catch (error: any) {
    if (error.message === 'Appeal ID is required') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Appeal ID must be a string') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Invalid appeal ID') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
}
