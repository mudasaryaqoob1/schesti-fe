export type G703State = {
  applicationNo: string;
  applicationDate: string;
  periodTo: string;
  projectNo: string;
  data: Array<G703Row>;
  rows: Array<any>;
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




export function getCalculatedRows(data: Array<G703Row>): G703Row {

  return [
    'GRAND TOTAL',
    `=SUM(B1:B${data.length})`,
    `=SUM(C1:C${data.length})`,
    `=SUM(D1:D${data.length})`,
    `=SUM(E1:E${data.length})`,
    `=SUM(F1:F${data.length})`,
    `=SUM(G1:G${data.length})`,
    `=SUM(H1:H${data.length})`,
    `=SUM(I1:I${data.length})`,
  ];
}


export function getGrandTotal(data: string[]) {
  return data.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0);
}

export function getColumnFromRows(rows: Array<G703Row>, columnIndex: number) {
  return rows.map(row => row[columnIndex]);
}