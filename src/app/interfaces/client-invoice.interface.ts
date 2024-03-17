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
  phase: number;

  // Amount
  totalAmount: number;
  amountPaid: number;

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
