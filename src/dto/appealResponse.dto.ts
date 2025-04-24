import { IAppeal, AppealStatus } from '../models/appeal.model';

export class AppealCreateResponseDto {
  id: string;
  theme: string;
  text: string;
  appealStatus: AppealStatus;
  date: Date;

  constructor(appeal: IAppeal) {
    this.id = appeal._id;
    this.theme = appeal.theme;
    this.text = appeal.text;
    this.appealStatus = appeal.appealStatus;
    this.date = appeal.date;
  }
}

export class AppealCancelResponseDto {
  id: string;
  theme: string;
  text: string;
  appealStatus: AppealStatus;
  date: Date;
  cancelReason: string;

  constructor(appeal: IAppeal, cancelReason: string) {
    this.id = appeal._id;
    this.theme = appeal.theme;
    this.text = appeal.text;
    this.appealStatus = appeal.appealStatus;
    this.date = appeal.date;
    this.cancelReason = cancelReason;
  }
}

export class AppealEndResponseDto {
  id: string;
  theme: string;
  text: string;
  appealStatus: AppealStatus;
  date: Date;
  decision: string; 

  constructor(appeal: IAppeal, decision: string) {
    this.id = appeal._id;
    this.theme = appeal.theme;
    this.text = appeal.text;
    this.appealStatus = appeal.appealStatus;
    this.date = appeal.date;
    this.decision = decision;
  }
}
