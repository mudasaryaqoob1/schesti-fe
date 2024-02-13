import { IResponseInterface } from '../interfaces/api-response.interface';
import { HttpService } from './base.service';

type Data = {
  email: string;
  phone: string;
  company: string;
  name: string;
  employees: string;
};
class ContactService extends HttpService {
  private readonly prefix: string = 'api/contact';

  httpSendContactInfoToClient = (data: Data): Promise<IResponseInterface> =>
    this.post(`${this.prefix}`, data);
}
export const contactService = new ContactService();
