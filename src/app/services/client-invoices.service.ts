import { IResponseInterface } from '../interfaces/api-response.interface';
import { G7State, IAIAInvoice } from '../interfaces/client-invoice.interface';
import { HttpService } from './base.service';

class ClientInvoiceService extends HttpService {
  private readonly prefix: string = 'api/client-invoices';

  httpCreateInitialInvoice = (
    data: {
      clientName: string;
      architectName: string;
      invoiceName: string;
    }
  ): Promise<IResponseInterface<{ invoice: IAIAInvoice }>> =>
    this.post(`${this.prefix}/create`, data);

  httpAddNewInvoice = (
    data: G7State
  ): Promise<IResponseInterface<{ invoice: IAIAInvoice }>> =>
    this.post(`${this.prefix}/createInvoice`, data);

  httpGetParentInvoiceById = (
    id: string
  ): Promise<IResponseInterface<{ invoice: IAIAInvoice }>> =>
    this.get(`${this.prefix}/invoice/${id}`);

  httpCreateNewInvoicePhase = (
    id: string,
    data: G7State
  ): Promise<IResponseInterface<{ invoice: IAIAInvoice }>> =>
    this.post(`${this.prefix}/createPhase/${id}`, data);

  httpGetAllInvoices = (): Promise<
    IResponseInterface<{ invoices: IAIAInvoice[] }>
  > => this.get(`${this.prefix}/getInvoices`);

  httpGetAllInvoicesWithChildren = (): Promise<
    IResponseInterface<{ invoices: IAIAInvoice[] }>
  > => this.get(`${this.prefix}/all`);

  httpGetInvoicePhases = (
    invoiceId: string
  ): Promise<IResponseInterface<{ invoices: IAIAInvoice[] }>> =>
    this.get(`${this.prefix}/getPhases/${invoiceId}`);

  httpDeleteClientInvoiceAndPhases = (
    invoiceId: string
  ): Promise<IResponseInterface<{ invoice: IAIAInvoice }>> =>
    this.delete(`${this.prefix}/${invoiceId}`);
}

export const clientInvoiceService = new ClientInvoiceService();
