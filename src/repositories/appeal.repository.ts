import mongoose from 'mongoose';
import { AppealRequestDto } from '../dto/appealRequest.dto';
import { Appeal, AppealStatus, IAppeal } from '../models/appeal.model';
import {
  AppealCancelResponseDto,
  AppealCreateResponseDto,
  AppealEndResponseDto,
} from '../dto/appealResponse.dto';

export class AppealRepository {
  async createAppeal(body: AppealRequestDto): Promise<AppealCreateResponseDto> {
    try {
      const appeal = new Appeal({
        theme: body.theme,
        text: body.text,
        appealStatus: AppealStatus.NEW,
        date: new Date(),
      });
      await appeal.save();
      const appealDto = new AppealCreateResponseDto({
        _id: appeal._id.toString(),
        theme: appeal.theme,
        text: appeal.text,
        appealStatus: appeal.appealStatus,
        date: appeal.date,
      });
      return appealDto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async takeAppeal(appealId: string): Promise<AppealCreateResponseDto> {
    try {
      const appeal = await Appeal.findById(appealId);
      if (!appeal) {
        throw new Error('Appeal not found');
      }
      if (appeal.appealStatus !== AppealStatus.NEW) {
        throw new Error('Appeal is not new');
      }
      appeal.appealStatus = AppealStatus.IN_PROGRESS;
      await appeal.save();
      const appealDto = new AppealCreateResponseDto({
        _id: appeal._id.toString(),
        theme: appeal.theme,
        text: appeal.text,
        appealStatus: appeal.appealStatus,
        date: appeal.date,
      });
      return appealDto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async cancelAppeal(
    appealId: string,
    cancelReason?: string,
  ): Promise<AppealCancelResponseDto> {
    try {
      const appeal = await Appeal.findById(appealId);
      if (!appeal) {
        throw new Error('Appeal not found');
      }
      if (appeal.appealStatus !== AppealStatus.IN_PROGRESS) {
        throw new Error('Appeal is not in progress');
      }
      const defaultReasons = [
        'Customer request',
        'Issue resolved elsewhere',
        'Duplicate appeal',
        'Information no longer needed',
        'Technical limitations',
      ];
      const reason =
        cancelReason ||
        defaultReasons[Math.floor(Math.random() * defaultReasons.length)];
      appeal.appealStatus = AppealStatus.CANCELLED;
      await appeal.save();

      const appealDto = new AppealCancelResponseDto(
        {
          _id: appeal._id.toString(),
          theme: appeal.theme,
          text: appeal.text,
          appealStatus: appeal.appealStatus,
          date: appeal.date,
        },
        reason,
      );
      return appealDto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async cancelAllAppealsInProgress(): Promise<AppealCancelResponseDto[]> {
    try {
      const appeals = await Appeal.find({
        appealStatus: AppealStatus.IN_PROGRESS,
      });
      for (const appeal of appeals) {
        appeal.appealStatus = AppealStatus.CANCELLED;
        await appeal.save();
      }
      return appeals.map(
        (appeal) =>
          new AppealCancelResponseDto(
            {
              _id: appeal._id.toString(),
              theme: appeal.theme,
              text: appeal.text,
              appealStatus: appeal.appealStatus,
              date: appeal.date,
            },
            'Mass appeal cancel',
          ),
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findAllByDate(dates: string[]): Promise<AppealCreateResponseDto[]> {
    try {
      const startDate: string = `${dates[0]}T00:00:00.000+00:00`;
      const endDate: string = `${dates[1]}T23:59:59.999+00:00`;
      const appeals = await Appeal.find({
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      return appeals.map(
        (appeal) =>
          new AppealCreateResponseDto({
            _id: appeal._id.toString(),
            theme: appeal.theme,
            text: appeal.text,
            appealStatus: appeal.appealStatus,
            date: appeal.date,
          }),
      );
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async endAppeal(appealId: string): Promise<AppealEndResponseDto> {
    try {
      const appeal = await Appeal.findById(appealId);
      if (!appeal) {
        throw new Error('Appeal not found');
      }
      if (appeal.appealStatus !== AppealStatus.IN_PROGRESS) {
        throw new Error('Appeal is not in progress');
      }
      const decision = [
        'You need to hardwork',
        'You need to work harder',
        'You need to work even harder',
        'You need to work even even harder',
        'You need to work even even even harder',
        'You need to work even even even even harder',
      ];
      const randomDecision =
        decision[Math.floor(Math.random() * decision.length)];
      appeal.appealStatus = AppealStatus.END;
      await appeal.save();
      const appealDto = new AppealEndResponseDto({
        _id: appeal._id.toString(),
        theme: appeal.theme,
        text: appeal.text,
        appealStatus: appeal.appealStatus,
        date: appeal.date,
      }, randomDecision);
      return appealDto;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
