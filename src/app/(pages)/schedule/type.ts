export type IScheduleState = {
  projectName: string;
  duration: number;
  hoursPerDay: number;
  regularWorkingDays: {
    day: string;
    hours: number;
    isChecked: boolean;
  }[];
};
