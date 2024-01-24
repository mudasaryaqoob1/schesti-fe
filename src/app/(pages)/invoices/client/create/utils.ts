export type G703State = {
  applicationNo: string;
  applicationDate: string;
  periodTo: string;
  projectNo: string;
  data: Array<G703Row>;
};
export type G703Row = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export function rowTemplate(index: number): G703Row {
  return [
    '',
    '',
    // `=0 + D${index}`,
    '',
    '',
    '',
    `=C${index} + D${index} + E${index}`,
    `=(F${index} / B${index}) * 100`,
    `=B${index} - F${index}`,
    `=(10 / 100) * F${index}`,
  ];
}
