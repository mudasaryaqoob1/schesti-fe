import { FileInterface } from '../file.interface';
import { IUserInterface } from '../user.interface';

export interface IFinancialExpense {
  _id: string;
  name: string;
  costCode: number;
  expenseType: string;
  expenseDate: string;
  invoiceNo: string;
  totalPrice: number;
  project: string;
  note: string;
  salesTax: number;
  countryTax: number;
  paymentMethod: string;
  reference: string;
  repeat: string;
  file: FileInterface;
  user: string | IUserInterface;
  createdAt: string;
  updatedAt: string;
  status: "paid" | "unpaid";
  transactionDate: string;
  additionalDetails: string;
}
