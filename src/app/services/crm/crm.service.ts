import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { CommonCrmType, CrmModuleType, CrmType } from "@/app/interfaces/crm/crm.interface";


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

    httpCreate = (data: CreateCrmItemType): Promise<IResponseInterface<CrmType>> => this.post(this.endPoint, data);

    httpCreateMany = (data: CommonCrmType[], module: CrmModuleType): Promise<IResponseInterface<{
        duplicates: CommonCrmType[];
        items: CrmType[]
    }>> => this.post(`${this.endPoint}/createMany?module=${module}`, data);

    httpGetItems = (query: QueryParams): Promise<IResponseInterface<CrmType[]>> => this.get(`${this.endPoint}/all?module=${query.module}`);

    httpGetItemById = (id: string): Promise<IResponseInterface<CrmType>> => this.get(`${this.endPoint}/${id}`);

    httpfindByIdAndUpdate = (id: string, data: CreateCrmItemType): Promise<IResponseInterface<CrmType>> => this.put(`${this.endPoint}/${id}`, data);

    httpfindByIdAndDelete = (id: string): Promise<IResponseInterface<CrmType>> => this.put(`${this.endPoint}/${id}`);

    httpParseCsvFile = (formData: FormData, module: CrmModuleType): Promise<IResponseInterface<CommonCrmType[]>> => this.post(`${this.endPoint}/parse-csv?module=${module}`, formData);

}

const crmService = new CrmService();

export default crmService;
