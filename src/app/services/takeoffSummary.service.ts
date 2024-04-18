// Importing base class and interfaces
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '../interfaces/api-response.interface';
import { CreateTakeoffSummaryRequest } from '../interfaces/takeoff/summay';

class TakeoffSummaryService extends HttpService {
  private readonly prefix: string = 'api/takeoff-summary';

  httpCreateTakeoffSummary = (
    data: CreateTakeoffSummaryRequest
  ): Promise<IResponseInterface> => this.post(`${this.prefix}/`, data);

  httpGetAllTakeoffSummaries = (): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/`);

  httpSoftDeleteTakeoffSummary = (
    summaryId: string
  ): Promise<IResponseInterface> => this.delete(`${this.prefix}/${summaryId}`);
}

export const takeoffSummaryService = new TakeoffSummaryService();
