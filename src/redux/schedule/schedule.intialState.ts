import { ISchedule } from '@/app/interfaces/schedule/schedule.type';

type IScheduleState = {
  schedules: ISchedule[];
};

export const initialScheduleState: IScheduleState = {
  schedules: [],
};
