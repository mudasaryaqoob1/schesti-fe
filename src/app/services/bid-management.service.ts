import { IResponseInterface } from '../interfaces/api-response.interface';
import { IBidManagement, IBidManagementProjectTeamMember } from '../interfaces/bid-management/bid-management.interface';
import { HttpService } from './base.service';


export type CreateOwnerPostProjectType = Pick<IBidManagement, "projectName" | "country" | "city" | "zipCode" | "state" | "constructionTypes" | "address" | "status">

export type CreateTeamMemberType = Omit<IBidManagementProjectTeamMember, "_id" | "createdAt" | "updatedAt" | "user">

class BidManagementService extends HttpService {
    private readonly prefix: string = 'api/bids';

    httpCreateBidPostProject = (
        data: CreateOwnerPostProjectType
    ): Promise<IResponseInterface<{ createdProject: IBidManagement }>> =>
        this.post(`${this.prefix}/create-project`, data);

    httpUpdateBidPostProject = (projectId: string, data: Partial<IBidManagement>): Promise<IResponseInterface<{ updatedProject: IBidManagement }>> => this.put(`${this.prefix}/update-project/${projectId}`, data);

    httpCreateTeamDesignMember = (data:CreateTeamMemberType):Promise<IResponseInterface<{user:IBidManagementProjectTeamMember}>> => this.post(`${this.prefix}/create-team-member`, data);
    
    httpGetOwnerProjectById = (projectId:string):Promise<IResponseInterface<{project:IBidManagement}>> => this.get(`${this.prefix}/project-detail/${projectId}`);

    httpGetOwnerProjects = ():Promise<IResponseInterface<{projects:IBidManagement[]}>> => this.get(`${this.prefix}/get-all`);
}

export const bidManagementService = new BidManagementService();
