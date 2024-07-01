import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { CrmModuleType, ICrmItem } from "@/app/interfaces/crm/crm.interface";


type CreateVendorType = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    companyName: string;
    phone: string;
    secondAddress?: string;
};

type QueryParams = {
    module: CrmModuleType
}

class CrmService extends HttpService {
    private endPoint = 'api/crm/vendors';

    httpCreate = (data: CreateVendorType): Promise<IResponseInterface<ICrmItem>> => this.post(this.endPoint, data);

    httpGetItems = (query: QueryParams): Promise<IResponseInterface<ICrmItem[]>> => this.get(`${this.endPoint}/all?module=${query.module}`);

    httpGetItemById = (id: string): Promise<IResponseInterface<ICrmItem>> => this.get(`${this.endPoint}/${id}`);

}

const crmService = new CrmService();

export default crmService;
