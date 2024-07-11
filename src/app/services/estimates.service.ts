// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { IEstimateRequest } from '@/app/interfaces/estimateRequests/estimateRequests.interface';

class EstimateRequestsService extends HttpService {
  private readonly prefix: string = 'api/estimate';

  httpAddNewEstimateRequest = (
    data: IEstimateRequest
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/addNewEstimateRequest`, data);

  httpGetAllEstimateRequests = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getAllEstimateRequests?page=${page}&limit=${limit}`
    );

  httpGetEstimateDetail = (id: string | null): Promise<IResponseInterface> =>
    this.get(`${this.prefix}//estimateDetail/${id}`);

  httpUpdateEstimateRequest = (
    data: IEstimateRequest,
    estimateId: string | string[]
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/updateEstimateRequest/${estimateId}`, data);

  httpDeleteEstimateRequest = (
    estimateId: string
  ): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteEstimateRequest/${estimateId}`);

  httpAddGeneratedEstimate = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken; _id?: string }>> =>
    this.post(`${this.prefix}/addNewGenerateEstimate`, data);

  httpGetAllGeneratedEstimates = (
    page: number,
    limit: number = 9
  ): Promise<IResponseInterface> =>
    this.get(
      `${this.prefix}/getGeneratedEstimates?page=${page}&limit=${limit}`
    );

  httpGetAllGeneratedEstimatesWithoutLimit = (): Promise<
    IResponseInterface<{ generatedEstimates: IEstimateRequest[] }>
  > => this.get(`${this.prefix}/getGeneratedEstimates`);

  httpDeleteGeneratedEstimate = (
    estimateId: string
  ): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/deleteGeneratedEstimate/${estimateId}`);
  httpChangeGeneratedEstimateStatus = (
    estimateId: string,
    data : {status : string , reason : string}
  ): Promise<IResponseInterface> =>
    this.post(`${this.prefix}/changeGeneratedEstimateStatus/${estimateId}` , data);

  httpGetGeneratedEstimateDetail = (
    estimateId: string | string[]
  ): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/getGeneratedEstimateDetail/${estimateId}`);

  httpEstimateRequestStatusChangeHandler = (
    estimateId: string,
    bodyObject: any
  ): Promise<IResponseInterface<{ estimateRequestData: IEstimateRequest }>> =>
    this.put(`${this.prefix}/changeEstimateStatus/${estimateId}`, {
      status: bodyObject.status,
    });
}
export const estimateRequestService = new EstimateRequestsService();
