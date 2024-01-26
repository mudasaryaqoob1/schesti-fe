import { IResponseInterface } from '../interfaces/api-response.interface';
import { G7State, IClientInvoice } from '../interfaces/client-invoice.interface';
import { HttpService } from './base.service';


class ClientInvoiceService extends HttpService {
  private readonly prefix: string = 'api/client-invoices';

  httpAddNewInvoice = (
    data: G7State
  ): Promise<IResponseInterface<{ invoice: IClientInvoice }>> =>
    this.post(`${this.prefix}/createInvoice`, data);

  httpGetAllInvoices = (): Promise<IResponseInterface<{ invoices: IClientInvoice[] }>> =>
    this.get(`${this.prefix}/getInvoices`);
}

export const clientInvoiceService = new ClientInvoiceService();
