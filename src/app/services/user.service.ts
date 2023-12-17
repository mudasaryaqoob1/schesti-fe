// Importing base class
import { HttpService } from '@/app/services/base.service';
// import { ICompanyDetailInterface } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
// import { INewUserInterface } from '@/app/interfaces/newUser';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';

class UserService extends HttpService {
  private readonly prefix: string = 'api/company';

  httpUpdateCompanyDetail = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/updateCompanyDetail`, data);

  httpAddNewEmployee = (data: any): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/newEmployee`, data);

  httpGetCompanyDetail = (): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/companyDetail`);

  httpGetCompanyEmployee = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface<any>> =>
    this.get(`${this.prefix}/companyEmployees?page=${page}&limit=${limit}`);

  // company client services
  httpGetCompanyClients = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/allClients?page=${page}&limit=${limit}`);

  httpDeleteClient = (clientId: string): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteClient/${clientId}`);

  httpAddNewClient = (data: IClient): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/newClient`, data);
  httpUpdateClient = (
    data: IClient,
    clientId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateClient/${clientId}`, data);
}

export const userService = new UserService();
