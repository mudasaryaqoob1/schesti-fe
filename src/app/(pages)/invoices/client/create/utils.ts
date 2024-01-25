export type G703State = {
  applicationNo: string;
  applicationDate: string;
  periodTo: string;
  projectNo: string;
  data: string[][]
  rows: Array<any>;
};
export function rowTemplate(index: number) {
  return [
    `${index}`,
    `item-${index}`,
    '',
    '',
    '',
    ``,
    ``,
    ``,
    ``,
  ];
}

export function generateData(): Array<string[]> {
  return Array.from({ length: 10 }).map((_, index) => {
    return rowTemplate(index);
  });
}
