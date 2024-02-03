// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';

class ScheduleService extends HttpService {
  private readonly prefix: string = 'api/schedule';

  httpGenerateSchedule = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken }>> =>
    this.post(`${this.prefix}/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
}
export const scheduleService = new ScheduleService();
