// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { ICompanySetup } from '@/app/interfaces/companyInterfaces/setting.interface';

class CompanySetupService extends HttpService {
  private readonly prefix: string = '/api/setting/companySetup';

  httpAddNewCategory = (
    data: ICompanySetup
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewCategory`, data);

  httpGetAllCategories = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllCategories?page=${page}&limit=${limit}`);

  httpUpdateCategory = (
    data: ICompanySetup,
    category: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateCategory/${category}`, data);

  httpDeleteCategory = (category: string): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/delete/${category}`);
}
export const companySetupService = new CompanySetupService();
