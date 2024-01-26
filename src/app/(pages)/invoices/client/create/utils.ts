export type G7State = {
  applicationNo: string;
  applicationDate: string;
  periodTo: string;
  projectNo: string;
  invoiceName: string;
  data: string[][];
  toOwner: string;
  project: string;
  address: string;
  viaEngineer: string;
  distributionTo: string;
  orignalContractSum: string;
  netChangeByOrders: string;
  amountCertified1: string;
  amountCertified2: string;
  lessPreviousCertificatesForPayment: string;
  by: string;
  stateOf: string;
  date: string;
  country: string;
  subscribedAndSworn: string;
  notaryPublic: string;
  myCommissionExpires: string;
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
