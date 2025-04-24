import { Request, Response, NextFunction } from 'express';

export function parseQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const dates = req.query.date as string[];
    if (!dates) {
      throw new Error('Invalid date format, use YYYY-MM-DD');
    }
    if (dates.length === 1) {
        dates.push(dates[0]);
    }
    if (dates.length !== 2) {
      throw new Error('You must provide one or two dates');
    }
    dates.forEach((el) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(el)) {
        throw new Error('Invalid date format, use YYYY-MM-DD');
      }
      const date = new Date(el);
      if (isNaN(date.getTime())) {
        throw new Error('Date does not exist');
      }
    });
    next();
  } catch (error: any) {
    if (error.message === 'You must provide one or two dates') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Invalid date format, use YYYY-MM-DD') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'Date does not exist') {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
}
