// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IToken } from '@/app/interfaces/authInterfaces/token.interface';
import { IProject } from '../interfaces/schedule/project.schedule.interface';

class ScheduleService extends HttpService {
  private readonly prefix: string = 'api/schedule';

  httpGenerateSchedule = (
    data: any
  ): Promise<IResponseInterface<{ token: IToken , createProject : IProject }>> =>
    this.post(`${this.prefix}/create`, data);


    httpGetAllScheduleProjects = (): Promise<IResponseInterface<{ scheduleProjects: IProject[] }>> =>
    this.get(`${this.prefix}/schedule-projects`);


    httpGetScheduleProjectDetail = (projectId : string): Promise<IResponseInterface<{ scheduleProjectDetail: IProject  }>> =>
    this.get(`${this.prefix}/schedule-project/${projectId}`);
}
export const scheduleService = new ScheduleService();
