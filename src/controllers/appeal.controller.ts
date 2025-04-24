import { AppealRepository } from "../repositories/appeal.repository";
import { AppealRequestDto } from "../dto/appealRequest.dto";
import { NextFunction, Request, Response } from "express";


const appealRepository = new AppealRepository();

export async function createAppeal(req: Request, res: Response, next: NextFunction){
    try {
        const appeal = await appealRepository.createAppeal(req.body as AppealRequestDto);
        res.status(201).json(appeal);
    } catch (error) {
        next(error);
    }
}