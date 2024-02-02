// Importing base class
import { HttpService } from '@/app/services/base.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IMeeting } from '../interfaces/meeting.type';


export type CreateMeetingType = Omit<IMeeting, '_id' | "createdAt" | "updatedAt" | "associatedCompany">;
class MeetingService extends HttpService {
    private readonly prefix: string = 'api/meeting';

    httpCreateMeeting = (
        data: CreateMeetingType
    ): Promise<IResponseInterface<{ meeting: IMeeting }>> =>
        this.post(`${this.prefix}/upload-materials`, data,);
}
export const meetingService = new MeetingService();
