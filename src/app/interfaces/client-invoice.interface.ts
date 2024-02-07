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
  amountCertified1: string;
  amountCertified2: string;
  amountCertified3: string;
  by: string;
  stateOf: string;
  date: string;
  country: string;
  subscribedAndSworn: string;
  notaryPublic: string;
  myCommissionExpires: string;
  phase: number;

  // g702
  totalAdditionPreviousMonth: number;
  totalDeductionPreviousMonth: number;
  totalAdditionThisMonth: number;
  totalDeductionThisMonth: number;

  // G702 5. RETAINAGE:
  p5aPercentage: number;
  p5bPercentage: number;
};

export type IClientInvoice = {
  associatedComapny: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
} & G7State;
