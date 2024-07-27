import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { ICrmDailyWork } from "@/app/interfaces/crm/crm-daily-work.interface";


export type ICrmDailyWorkCreate = {
    work: string;
    deadline: string;
    note: string;
    email: string;
    phone: string;
}

class CrmDailyWorkService extends HttpService {
    private prefix = 'api/crm/daily-work';

    httpCreateDailyWork = (data: ICrmDailyWorkCreate):Promise<IResponseInterface<ICrmDailyWork>> => this.post(`${this.prefix}/create`, data);

    httpGetDailyWorkByDate = (date: string):Promise<IResponseInterface<ICrmDailyWork[]>> => this.get(`${this.prefix}/leads/${date}`);
}

export default new CrmDailyWorkService()