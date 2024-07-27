import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { ICrmDailyWork } from "@/app/interfaces/crm/crm-daily-work.interface";

class CrmDailyWorkService extends HttpService {
    private prefix = 'api/crm/daily-work';

    httpCreateDailyWork = (data: {
        work: string;
        deadline: string;
        note: string;
        email: string;
        phone: string;
    }):Promise<IResponseInterface<ICrmDailyWork>> => this.post(`${this.prefix}/create`, data)
}

export default new CrmDailyWorkService()