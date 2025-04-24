import mongoose from 'mongoose';

export enum AppealStatus {
  NEW = 'new',
  IN_PROGRESS = 'in progress',
  END = 'end',
  CANCELLED = 'cancelled',
}

export interface IAppeal {
  _id: string;
  theme: string;
  text: string;
  date: Date;
  appealStatus: AppealStatus;
}

const appealSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  appealStatus: {
    type: String,
    enum: Object.values(AppealStatus),
    required: true,
    default: AppealStatus.NEW,
  },
});

export const Appeal = mongoose.model<IAppeal>('Appeal', appealSchema);
