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
