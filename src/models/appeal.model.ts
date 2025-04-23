export interface Appeal {
    id: number;
    text: string;
    date: string;
    status: AppealStatus;
}

export enum AppealStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
