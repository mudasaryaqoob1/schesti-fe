import { IResponseInterface } from '../interfaces/api-response.interface';
import {
  G7State,
  IClientInvoice,
} from '../interfaces/client-invoice.interface';
import { HttpService } from './base.service';

class ClientInvoiceService extends HttpService {
  private readonly prefix: string = 'api/client-invoices';

  httpAddNewInvoice = (
    data: G7State
  ): Promise<IResponseInterface<{ invoice: IClientInvoice }>> =>
    this.post(`${this.prefix}/createInvoice`, data);

  httpCreateNewInvoicePhase = (id: string, data: G7State): Promise<IResponseInterface<{ invoice: IClientInvoice }>> => this.post(`${this.prefix}/createPhase/${id}`, data)

  httpGetAllInvoices = (): Promise<
    IResponseInterface<{ invoices: IClientInvoice[] }>
  > => this.get(`${this.prefix}/getInvoices`);

  httpGetInvoicePhases = (invoiceId: string): Promise<IResponseInterface<{ invoices: IClientInvoice[] }>> => this.get(`${this.prefix}/getPhases/${invoiceId}`);

  httpDeleteClientInvoiceAndPhases = (invoiceId: string): Promise<IResponseInterface<{ invoice: IClientInvoice }>> => this.delete(`${this.prefix}/${invoiceId}`)
}

export const clientInvoiceService = new ClientInvoiceService();
