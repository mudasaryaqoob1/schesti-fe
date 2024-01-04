// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { CategoryInitTypes } from '@/app/(pages)/settings/CategorySetup/addCategory/page';
import { SubcategoryInitValues } from '@/app/(pages)/settings/CategorySetup/addSubcategory/page';

class CompanySetupService extends HttpService {
  private readonly prefix: string = 'api/setting/companySetup';

  // category 
  httpAddNewCategory = (
    data: CategoryInitTypes
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewCategory`, data);

  httpGetAllCategories = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllCategories?page=${page}&limit=${limit}`);

  httpUpdateCategory = (
    categoryId: string,
    data: CategoryInitTypes
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateCategory/${categoryId}`, data);

  httpDeleteCategory = (category: string): Promise<IResponseInterface> =>
    this.delete(`${this.prefix}/category/delete/${category}`);

  // sub category
  httpAddNewSubcategory = (
    data: SubcategoryInitValues
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewSubcategory`, data);

  httpGetAllSubcategories = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllSubcategories?page=${page}&limit=${limit}`);

  httpUpdateSubcategory = (
    data: any
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateSubcategory/${data._id}`, data);

  httpDeleteSubcategory = (category: string): Promise<IResponseInterface> =>
    this.delete(`${this.prefix}/subcategory/delete/${category}`);
}
export const companySetupService = new CompanySetupService();
