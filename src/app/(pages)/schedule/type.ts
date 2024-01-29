export type IScheduleState = {
  projectName: string;
  duration?: number;
  hoursPerDay: number;
  scheduleType: string;
  fullDaysPerWeek: number;
  regularWorkingDays: {
    day: string;
    hours: number;
    isChecked: boolean;
  }[];
};
