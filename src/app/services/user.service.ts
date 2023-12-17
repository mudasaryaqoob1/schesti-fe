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

  httpAddNewUser = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/newUser`, data);

  httpGetCompanyDetail = (comapnyId: string): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/companyDetail/${comapnyId}`);

  httpGetCompanyUsers = (comapnyId: string): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/companyUsers/${comapnyId}`);

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

class SubcontractorsService extends HttpService {
  private readonly prefix: string = 'api/subcontractor';

  httpAddNewSubcontractor = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewSubcontractor`, data);

  httpGetAllSubcontractors = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllSubcontractors?page=${page}&limit=${limit}`);

  httpUpdateSubontractor = (
    data: IClient,
    clientId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateSubcontractor/${clientId}`, data);

  httpDeleteSubcontractor = (subcontractorId: string): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteSubcontractor/${subcontractorId}`);
}
export const userService = new UserService();
export const subcontractorService = new SubcontractorsService();
