import { IResponseInterface } from '../interfaces/api-response.interface';
import { IBidManagement } from '../interfaces/bid-management/bid-management.interface';
import { HttpService } from './base.service';


type CreateOwnerBidType = Pick<IBidManagement, "projectName" | "country" | "city" | "zipCode" | "state" | "constructionTypes" | "address" | "status">

class BidManagementService extends HttpService {
    private readonly prefix: string = 'api/bids';

    httpCreateBidPostProject = (
        data: CreateOwnerBidType
    ): Promise<IResponseInterface<{ createdProject: IBidManagement }>> =>
        this.post(`${this.prefix}/create-project`, data);

    httpUpdateBidPostProject = (projectId: string, data: Partial<IBidManagement>): Promise<{ updatedProject: IBidManagement }> => this.put(`${this.prefix}/update-project/${projectId}`, data);

}

export const bidManagementService = new BidManagementService();
