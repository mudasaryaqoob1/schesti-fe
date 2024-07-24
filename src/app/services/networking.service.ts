// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { IEstimateRequest } from '@/app/interfaces/estimateRequests/estimateRequests.interface';

class NetworkingService extends HttpService {
  private readonly prefix: string = 'api/networking';

  httpGetSchestiUsers = (
    userRole: string,
    page: number = 0,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getSchestiUsers?userRole=${userRole}&page=${page}&limit=${limit}`);

  httpGetMyNetworkUsers = (
    userRole: string,
    page: number = 0,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getMyNetworkUsers?userRole=${userRole}&page=${page}&limit=${limit}`
    );
  httpGetInvitedClients = (
    page: number = 0,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getInvitedClients?page=${page}&limit=${limit}`
    );

  httpAddFriend = (id: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/addFriend/${id}`);

  httpRemoveFriend = (id: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/removeFriend/${id}`);

  httpAddInvitedClient = (email: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/addInvitedClient/${email}`);

  httpRemoveInvitedClient = (email: string): Promise<IResponseInterface> =>
    this.put(`${this.prefix}/removeInvitedClient/${email}`);

  httpNetworkingEmailSender = (data: any): Promise<any> =>
    this.post(`${this.prefix}/send-email`, data);
}
export const networkingService = new NetworkingService();
