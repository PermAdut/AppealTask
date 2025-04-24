import { Request, Response, NextFunction } from "express";

export function parseReqBody(req: Request, res: Response, next: NextFunction){
    try {
        const keys = Object.keys(req.body);
        console.log(req.body);
        const isValid = keys.length === 2 && 
            req.body.theme && 
            req.body.text &&
            typeof req.body.theme === 'string' &&
            typeof req.body.text === 'string';

        if (!isValid) {
            console.log('Invalid request body');
            throw new Error('Invalid request body');
        }
        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid request body'});
    }
}