import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { ICrmVendor } from "@/app/interfaces/crm/vendor.interface";


type CreateVendorType = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    companyName: string;
    phone: string;
    secondAddress?: string;
};

class CrmService extends HttpService {
    private endPoint = 'api/crm/vendors';

    httpCreate = (data: CreateVendorType): Promise<IResponseInterface<ICrmVendor>> => this.post(this.endPoint, data);

    httpGetItems = (): Promise<IResponseInterface<ICrmVendor[]>> => this.get(`${this.endPoint}/all`);

    httpGetItemById = (id: string): Promise<IResponseInterface<ICrmVendor>> => this.get(`${this.endPoint}/${id}`);

}

const crmService = new CrmService();

export default crmService;
