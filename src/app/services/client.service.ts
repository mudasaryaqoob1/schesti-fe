// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IClientInterface } from '@/app/interfaces/clien.interface';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/token.interface';
import { IGetClients } from '@/redux/clientSlice/getAll-clients';

class ClientService extends HttpService {
  private readonly prefix: string = 'api/client';

  httpNewClientHandler = (
    data: IClientInterface
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/new`, data);

  httpGetAllClients = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface<IGetClients<any>>> =>
    this.get(`${this.prefix}/all?page=${page}&limit=${limit}`);
}
export const clientService = new ClientService();
