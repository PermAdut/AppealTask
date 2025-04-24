import mongoose from "mongoose";
import { AppealRequestDto } from "../dto/appealRequest.dto";
import { Appeal, AppealStatus } from "../models/appeal.model";
import { AppealCreateResponseDto } from "../dto/appealResponse.dto";
export class AppealRepository{
    private mongoDbClient = mongoose.connection;

    async createAppeal(body:AppealRequestDto):Promise<AppealCreateResponseDto>{
        try{
            const appeal = new Appeal({
                theme:body.theme,
                text:body.text,
                appealStatus:AppealStatus.NEW,
                date:new Date(),
            });
            await appeal.save();
            const appealDto = new AppealCreateResponseDto(appeal);
            return appealDto;
        }catch(error){
            throw new Error('Failed to create appeal');
        }
    }
}