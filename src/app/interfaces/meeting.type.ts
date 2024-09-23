

type DailyRecurrence = {
  frequency: "daily";
  time: string;
};

type WeeklyRecurrence = {
  frequency: "weekly";
  days: string[];
  time: string;
};

type MonthlyRecurrence = {
  frequency: "monthly";
  day: number;
  time: string;
};

type CustomRecurrence = {
  frequency: "custom";
  dates: Date[];
  time: string;
  endsOn: "never" | "date";
  endDate?: Date;
}

export type IMeeting = {
  _id: string;
  topic: string;
  link: string;
  roomName: string;
  invitees: string[];
  startDate: string;
  endDate: string;
  timezone: string;
  associatedCompany: string;

  recurrence?: {
    isChecked: boolean;
  } & (DailyRecurrence | WeeklyRecurrence | MonthlyRecurrence | CustomRecurrence);

  createdAt: string;
  updatedAt: string;
};
