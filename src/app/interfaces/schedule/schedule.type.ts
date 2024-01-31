export type ISchedule = {
    _id: string;
    projectName: string;
    duration: number;
    hoursPerDay: number;
    regularWokingDays: { day: string; hours: number }[];
    date: Date;
}