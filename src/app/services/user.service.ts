// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
// import { IUpdateCompanyDetail } from '../interfaces/companyInterfaces/updateCompany.interface';

class UserService extends HttpService {
  private readonly companyPrefix: string = 'api/company';
  private readonly userPrefix: string = 'api/user';

  httpUpdateCompanyDetail = (
    data: any
  ): Promise<{ data: any; statusCode: number; message: string }> =>
    this.post(`${this.userPrefix}/updateCompanyDetail`, data);

  httpAddNewEmployee = (data: any): Promise<IResponseInterface<any>> =>
    this.post(`${this.companyPrefix}/newEmployee`, data);

  httpGetCompanyDetail = (): Promise<IResponseInterface> =>
    this.get(`${this.userPrefix}/companyDetail`);

  httpGetCompanyEmployee = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface<any>> =>
    this.get(
      `${this.companyPrefix}/companyEmployees?page=${page}&limit=${limit}`
    );

  // company client services
  httpGetCompanyClients = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.companyPrefix}/allClients?page=${page}&limit=${limit}`);

  httpDeleteClient = (clientId: string): Promise<IResponseInterface> =>
    this.post(`${this.companyPrefix}/deleteClient/${clientId}`);

  httpAddNewClient = (data: IClient): Promise<IResponseInterface<any>> =>
    this.post(`${this.companyPrefix}/newClient`, data);
  httpUpdateClient = (
    data: IClient,
    clientId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.companyPrefix}/updateClient/${clientId}`, data);
}

export const userService = new UserService();
