// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IClient } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { String } from 'aws-sdk/clients/acm';
// import { IUpdateCompanyDetail } from '../interfaces/companyInterfaces/updateCompany.interface';

class UserService extends HttpService {
  private readonly companyPrefix: string = 'api/company';
  private readonly userPrefix: string = 'api/user';

  httpUpdateCompanyDetail = (
    data: any
  ): Promise<{ data: any; statusCode: number; message: string }> =>
    this.post(`${this.userPrefix}/updateCompanyDetail`, data);

  httpAddNewEmployee = (data: any): Promise<IResponseInterface<any>> =>
    this.post(`${this.userPrefix}/newEmployee`, data);

  httpUpdateEmployee = (
    data: any,
    id: string
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.userPrefix}/updateEmployee/${id}`, data);

  httpBlockEmployee = (id: string): Promise<IResponseInterface<any>> =>
    this.post(`${this.userPrefix}/block`, id);

  httpUnBlockEmployee = (id: string): Promise<IResponseInterface<any>> =>
    this.post(`${this.userPrefix}/unBlock`, id);

  httpGetCompanyDetail = (): Promise<IResponseInterface> =>
    this.get(`${this.userPrefix}/companyDetail`);

  httpGetUsers = (
    page: number,
    limit: number = 9,
    queryRoles: String
  ): Promise<IResponseInterface<any>> =>
    this.get(
      `${this.userPrefix}/users?page=${page}&limit=${limit}&queryRoles=${queryRoles}`
    );

  httpGetAdminUsers = (
    page: number,
    limit: number = 9,
    queryRoles: String
  ): Promise<IResponseInterface<any>> =>
    this.get(
      `${this.userPrefix}/admin/users?page=${page}&limit=${limit}&queryRoles=${queryRoles}`
    );

  // company client services
  httpGetCompanyClients = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.companyPrefix}/allClients?page=${page}&limit=${limit}`);

  httpGetAllCompanyClients = (): Promise<IResponseInterface<{ clients: IClient[] }>> =>
    this.get(`${this.companyPrefix}/allClients`);

  httpDeleteClient = (clientId: string): Promise<IResponseInterface> =>
    this.post(`${this.companyPrefix}/deleteClient/${clientId}`);

  httpDeleteUser = (userId: string): Promise<IResponseInterface> =>
    this.delete(`${this.userPrefix}/delete/${userId}`);

  httpAddNewClient = (data: IClient): Promise<IResponseInterface<any>> =>
    this.post(`${this.companyPrefix}/newClient`, data);

  httpUpdateClient = (
    data: IClient,
    clientId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.companyPrefix}/updateClient/${clientId}`, data);
}

export const userService = new UserService();
