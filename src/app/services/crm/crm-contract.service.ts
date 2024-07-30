import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { HttpService } from '../base.service';
import { ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';

type CreateContractData = Omit<
  ICrmContract,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'user'
  | 'companyPdf'
  | 'userPdf'
  | 'senderTools'
  | 'receiverTools'
>;
class CrmContractService extends HttpService {
  private endPoint = 'api/crm/contract';

  httpCreateContract = (
    data: CreateContractData
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.post(this.endPoint, data);

  httpFindContractById = (
    id: string
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.get(`${this.endPoint}/${id}`);

  httpDeleteContractById = (
    id: string
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.delete(`${this.endPoint}/${id}`);

  httpSendContract = (
    id: string,
    tools: ICrmContract['senderTools']
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.post(`${this.endPoint}/send/${id}`, { tools });

  httpSignContract = (
    id: string,
    tools: ICrmContract['senderTools']
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.post(`${this.endPoint}/sign/${id}`, { tools });

  httpSenderUpdateTools = (
    id: string,
    tools: ICrmContract['senderTools']
  ): Promise<IResponseInterface<ICrmContract>> =>
    this.post(`${this.endPoint}/sender-tools/${id}`, { tools });

  httpGetCompanyContracts = (): Promise<IResponseInterface<ICrmContract[]>> =>
    this.get(`${this.endPoint}/all`);
}

export default new CrmContractService();
