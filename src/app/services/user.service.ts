// Importing base class
import { HttpService } from '@/app/services/base.service';
import { ICompanyDetailInterface } from '@/app/interfaces/addCompanyDetail.interface';
import { INewUserInterface } from '@/app/interfaces/newUser';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/token.interface';

class UserService extends HttpService {
  private readonly prefix: string = 'api/company';

  httpUpdateCompanyDetail = (
    data: ICompanyDetailInterface
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/updateCompanyDetail`, data);

  httpAddNewUser = (
    data: INewUserInterface
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/newUser`, data);

  httpGetCompanyDetail = (comapnyId: string): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/companyDetail/${comapnyId}`);

  httpGetCompanyUsers = (comapnyId: string): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/companyUsers/${comapnyId}`);
}
export const userService = new UserService();
