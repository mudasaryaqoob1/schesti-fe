// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IMeeting } from '../interfaces/meeting.type';

export type CreateMeetingType = Omit<
  IMeeting,
  '_id' | 'createdAt' | 'updatedAt' | 'associatedCompany'
>;
class MeetingService extends HttpService {
  private readonly prefix: string = 'api/meeting';

  httpCreateMeeting = (
    data: CreateMeetingType
  ): Promise<IResponseInterface<{ meeting: IMeeting }>> =>
    this.post(`${this.prefix}/create`, data);

  httpGetMeetings = (): Promise<IResponseInterface<{ meetings: IMeeting[] }>> =>
    this.get(`${this.prefix}/all`);

  httpGetMeetingByRoomName = (
    roomName = ''
  ): Promise<IResponseInterface<{ meeting: IMeeting }>> =>
    this.get(`${this.prefix}/roomName/${roomName}`);
}
export const meetingService = new MeetingService();
