// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { ISupportTicket } from '../interfaces/companyInterfaces/supportTicket.interface';

class SupportTicketService extends HttpService {
  private readonly prefix: string = 'api/supportTickets';

  httpAddNewSupportTicket = (
    data: ISupportTicket
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewSupportTicket`, data);

  httpGetAllSupportTickets = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllSupportTickets?page=${page}&limit=${limit}`);

  httpUpdateSupportTicket = (
    data: ISupportTicket,
    supportTicketId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateSupportTicket/${supportTicketId}`, data);

  httpDeleteSupportTicket = (
    supportTicketId: string
  ): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteSupportTicket/${supportTicketId}`);
}
export const supportTicketService = new SupportTicketService();
