export type IProject = {
  _id?: string,
  projectName: string;
  duration: number;
  durationType : string,
  hoursPerDay: number;
  regularWorkingDays: {
    day: string;
    hours: number;
    isChecked: boolean;
  }[];
};
