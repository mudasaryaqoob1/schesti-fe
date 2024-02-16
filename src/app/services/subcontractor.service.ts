// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { ISubcontract } from '../interfaces/companyEmployeeInterfaces/subcontractor.interface';
import { ISubcontractor } from '../interfaces/companyInterfaces/subcontractor.interface';

class SubcontractorsService extends HttpService {
  private readonly prefix: string = 'api/subcontractor';

  httpAddNewSubcontractor = (
    data: ISubcontract
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewSubcontractor`, data);

  httpGetAllSubcontractors = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getAllSubcontractors?page=${page}&limit=${limit}`);

  httpUpdateSubontractor = (
    data: ISubcontract,
    clientId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateSubcontractor/${clientId}`, data);


  httpFindSubcontractorById = (
    subcontractorId: string
  ): Promise<IResponseInterface<{ subcontractor: ISubcontractor }>> =>
    this.get(`${this.prefix}/${subcontractorId}`);

  httpDeleteSubcontractor = (
    subcontractorId: string
  ): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteSubcontractor/${subcontractorId}`);
}
export const subcontractorService = new SubcontractorsService();
