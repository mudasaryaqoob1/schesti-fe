import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { CrmModuleType, ICrmItem } from "@/app/interfaces/crm/crm.interface";


type CreateCrmItemType = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    companyName: string;
    phone: string;
    secondAddress?: string;
    module: CrmModuleType;
};

type QueryParams = {
    module: CrmModuleType
}

class CrmService extends HttpService {
    private endPoint = 'api/crm';

    httpCreate = (data: CreateCrmItemType): Promise<IResponseInterface<ICrmItem>> => this.post(this.endPoint, data);

    httpGetItems = (query: QueryParams): Promise<IResponseInterface<ICrmItem[]>> => this.get(`${this.endPoint}/all?module=${query.module}`);

    httpGetItemById = (id: string): Promise<IResponseInterface<ICrmItem>> => this.get(`${this.endPoint}/${id}`);

    httpfindByIdAndUpdate = (id: string, data: CreateCrmItemType): Promise<IResponseInterface<ICrmItem>> => this.put(`${this.endPoint}/${id}`, data);

    httpfindByIdAndDelete = (id: string): Promise<IResponseInterface<ICrmItem>> => this.put(`${this.endPoint}/${id}`);

}

const crmService = new CrmService();

export default crmService;
