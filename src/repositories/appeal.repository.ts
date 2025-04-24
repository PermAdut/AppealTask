import mongoose from "mongoose";
import { AppealRequestDto } from "../dto/appealRequest.dto";
import { Appeal, AppealStatus, IAppeal } from "../models/appeal.model";
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
            const appealDto = new AppealCreateResponseDto({
                _id:appeal._id.toString(),
                theme:appeal.theme,
                text:appeal.text,
                appealStatus:appeal.appealStatus,
                date:appeal.date,
            });
            return appealDto;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    async takeAppeal(appealId:string):Promise<AppealCreateResponseDto>{
        try{
            const appeal = await Appeal.findById(appealId);
            if(!appeal){
                throw new Error('Appeal not found');
            }
            if(appeal.appealStatus !== AppealStatus.NEW){
                throw new Error('Appeal is not new');
            }
            appeal.appealStatus = AppealStatus.IN_PROGRESS;
            await appeal.save();    
            const appealDto = new AppealCreateResponseDto({
                _id:appeal._id.toString(),
                theme:appeal.theme,
                text:appeal.text,
                appealStatus:appeal.appealStatus,
                date:appeal.date,
            });
            return appealDto;
        } catch(error: any){
            throw new Error(error.message);
        }
    }

    async cancelAppeal(appealId:string):Promise<AppealCreateResponseDto>{
        try{
            const appeal = await Appeal.findById(appealId);
            if(!appeal){
                throw new Error('Appeal not found');
            }
            if(appeal.appealStatus !== AppealStatus.IN_PROGRESS){
                throw new Error('Appeal is not in progress');
            }
            appeal.appealStatus = AppealStatus.CANCELLED;
            await appeal.save();
            const appealDto = new AppealCreateResponseDto({
                _id:appeal._id.toString(),
                theme:appeal.theme,
                text:appeal.text,
                appealStatus:appeal.appealStatus,
                date:appeal.date,
            });
            return appealDto;
        } catch(error:any){
            throw new Error(error.message);
        }
    }

    async cancelAllAppealsInProgress():Promise<AppealCreateResponseDto[]>{
        try{
            const appeals = await Appeal.find({appealStatus:AppealStatus.IN_PROGRESS});
            for(const appeal of appeals){
                appeal.appealStatus = AppealStatus.CANCELLED;
                await appeal.save();
            }
            return appeals.map(appeal => new AppealCreateResponseDto({
                _id:appeal._id.toString(),
                theme:appeal.theme,
                text:appeal.text,
                appealStatus:appeal.appealStatus,
                date:appeal.date,
            }));
        } catch(error:any){
            throw new Error(error.message);
        }
    }

    async findAllByDate(dates: string[]):Promise<AppealCreateResponseDto[]>{
        try{
            const appeals = await Promise.all(dates.map(async (el) => {
                const appeal = await Appeal.find({date:{$gte:`${el}T00:00:00.000+00:00`, $lte:`${el}T23:59:59.999+00:00`}});
                return appeal;
            }));
            return appeals.flat().map(appeal => new AppealCreateResponseDto({
                _id:appeal._id.toString(),
                theme:appeal.theme,
                text:appeal.text,
                appealStatus:appeal.appealStatus,
                date:appeal.date,
            }));
        }catch(error:any){
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}