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

class CrmVendorService extends HttpService {
    private endPoint = 'api/crm/vendors';

    httpCreateVendor = (data: CreateVendorType): Promise<IResponseInterface<ICrmVendor>> => this.post(this.endPoint, data);

}

const crmVendorService = new CrmVendorService();

export default crmVendorService;
