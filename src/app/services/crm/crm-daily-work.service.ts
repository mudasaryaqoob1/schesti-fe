import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { ICrmDailyWork, IDailyWorkStatus } from "@/app/interfaces/crm/crm-daily-work.interface";


export type ICrmDailyWorkCreate = {
    work: string;
    deadline: string;
    note: string;
    email: string;
    phone: string;
}

type CreateDailyWorkStatus = {
    name: string;
    color: string;
}

class CrmDailyWorkService extends HttpService {
    private prefix = 'api/crm/daily-work';

    httpCreateDailyWork = (data: ICrmDailyWorkCreate):Promise<IResponseInterface<ICrmDailyWork>> => this.post(`${this.prefix}/create`, data);

    httpGetDailyWorkByDate = (date: string):Promise<IResponseInterface<ICrmDailyWork[]>> => this.get(`${this.prefix}/leads/${date}`);

    httpCreateDailyWorkStatus = (data:CreateDailyWorkStatus):Promise<IResponseInterface<IDailyWorkStatus>> => this.post(`${this.prefix}/status`, data);

    httpGetAllDailyWorkStatus = ():Promise<IResponseInterface<IDailyWorkStatus[]>> => this.get(`${this.prefix}/status/all`);

    httpUpdateDailyWork = (data:ICrmDailyWork):Promise<IResponseInterface<ICrmDailyWork>> => this.put(`${this.prefix}/status/${data._id}`, data);
}

export default new CrmDailyWorkService()