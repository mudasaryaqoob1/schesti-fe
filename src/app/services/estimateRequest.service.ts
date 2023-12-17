// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { IEstimateRequest } from '../interfaces/companyInterfaces/estimateRequests.interface';

class EstimateRequestsService extends HttpService {
    private readonly prefix: string = 'api/estimateRequests';

    httpAddNewEstimateRequest = (
        data: IEstimateRequest
    ): Promise<IResponseInterface<{ token: IToken }>> =>
        this.post(`${this.prefix}/addNewEstimateRequest`, data);

    httpGetAllEstimateRequests = (
        page: number,
        limit: number = 9
    ): Promise<IResponseInterface> =>
        this.get(`${this.prefix}/getAllEstimateRequests?page=${page}&limit=${limit}`);

    httpUpdateEstimateRequest = (
        data: IEstimateRequest,
        estimateId: string | string[]
    ): Promise<IResponseInterface<any>> =>
        this.post(`${this.prefix}/updateEstimateRequest/${estimateId}`, data);

    httpDeleteEstimateRequest = (estimateId: string): Promise<IResponseInterface> =>
        this.post(`${this.prefix}/deleteEstimateRequest/${estimateId}`);
}
export const estimateRequestService = new EstimateRequestsService();