import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";
import { ICrmContract } from "@/app/interfaces/crm/crm-contract.interface";

type CreateContractData = Omit<ICrmContract, "_id" | "createdAt" | "updatedAt" | "user" | "companyPdf" | "userPdf" | "tools">
class CrmContractService extends HttpService {
    private endPoint = 'api/crm/contract';

    httpCreateContract = (data:CreateContractData):Promise<IResponseInterface<ICrmContract>> => this.post(this.endPoint, data)
}

export default new CrmContractService();

