type Category = {
  label: string;
  value: string;
};

type SubCategory = {
  categoryId: string;
} & Category;

export type IWBSType = {
  id: string;
  title: string;
  category: Category;
  subCategory: SubCategory;
  scopeItems: ScopeItem[]
};

export type ScopeItem = {
  id: string;
  description: string;
  orignalDuration: string;
  start: string;
  finish: string;
  actualStart: string;
  actualFinish: string;
  remainingDuration: string;
  scheduleCompleted: string;
  totalFloat: string;
  activityType: string;
  predecessors: string;
  successors: string;
  activityCalendar: string;
}