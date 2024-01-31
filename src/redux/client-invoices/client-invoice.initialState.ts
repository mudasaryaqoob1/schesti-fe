import { IClientInvoice } from '@/app/interfaces/client-invoice.interface';

export interface IClientInvoiceState {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: { invoices: IClientInvoice[] } | null;
}

const initialClientInvoiceState: IClientInvoiceState = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

export default initialClientInvoiceState;
