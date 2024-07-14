// Importing base class and interfaces
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '../interfaces/api-response.interface';
import { CreateTakeoffSummaryRequest } from '../interfaces/takeoff/summay';

class TakeoffSummaryService extends HttpService {
  private readonly prefix: string = 'api/takeoff-summary';

  // httpCreateTakeoffSummary = (
  //   data: CreateTakeoffSummaryRequest
  // ): Promise<IResponseInterface> => this.post(`${this.prefix}/`, data);

  // httpCreateTakeOffNew = (
  //   data: any
  // ): Promise<IResponseInterface> => this.post(`${this.prefix}/createTakeOff`, data);


  // httpUpdateTakeoffSummary = (
  //   data: any
  // ): Promise<IResponseInterface> => this.put(`${this.prefix}/${data?.id}`, {...data?.data});

  // httpGetAllTakeoffSummaries = (): Promise<IResponseInterface> =>
  //   this.get(`${this.prefix}/`);

  // httpSoftDeleteTakeoffSummary = (
  //   summaryId: string
  // ): Promise<IResponseInterface> => this.delete(`${this.prefix}/${summaryId}`);
  ////////////////////////////////////////////////changed to new/////////////////////
  httpCreateTakeoffSummary = (
    data: CreateTakeoffSummaryRequest
  ): Promise<IResponseInterface> => this.post(`${this.prefix}/`, data);

  httpCreateTakeOffNew = (
    data: any
  ): Promise<IResponseInterface> => this.post(`${this.prefix}/createTakeOff`, data);


  httpUpdateTakeoffSummary = (
    data: any
  ): Promise<any> => this.put(`${this.prefix}/new/${data?.id}`, {...data?.data});

  httpGetAllTakeoffSummaries = (): Promise<IResponseInterface> =>
    this.get(`${this.prefix}/new`);

  httpSoftDeleteTakeoffSummary = (
    summaryId: string
  ): Promise<IResponseInterface> => this.delete(`${this.prefix}/new/${summaryId}`);

  httpGetSignleTakeOffSummary = (
    summaryId: string
  ): Promise<any> => this.get(`${this.prefix}/new/${summaryId}`);
}

export const takeoffSummaryService = new TakeoffSummaryService();
