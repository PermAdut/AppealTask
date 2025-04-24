import { Request, Response, NextFunction } from "express";

export function parseQuery(req: Request, res: Response, next: NextFunction){
    try{
        let dates: string[];
        if (Array.isArray(req.query.date)) {
            dates = req.query.date as string[];
        } else {
            dates = [req.query.date as string];
        }
        if(!dates || dates.length === 0){
            throw new Error('Date is required');
        }
        dates.forEach((el) => {
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if(!regex.test(el)){
                throw new Error('Invalid date format, use YYYY-MM-DD');
            }
            const date = new Date(el);
            if (isNaN(date.getTime())) {
                throw new Error('Date does not exist');
            }
        });
        next();
    }catch(error:any){
        if(error.message === 'Date is required'){
            res.status(400).json({message:error.message});
        }else if(error.message === 'Invalid date format, use YYYY-MM-DD'){
            res.status(400).json({message:error.message});
        }else if(error.message === 'Date does not exist'){
            res.status(400).json({message:error.message});
        }else{
            next(error);
        }
    }
}