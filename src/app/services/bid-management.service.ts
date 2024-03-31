import { IResponseInterface } from '../interfaces/api-response.interface';
import {
  IBidManagement,
  IBidManagementProjectTeamMember,
} from '../interfaces/bid-management/bid-management.interface';
import { HttpService } from './base.service';

export type CreateOwnerPostProjectType = Pick<
  IBidManagement,
  | 'projectName'
  | 'country'
  | 'city'
  | 'zipCode'
  | 'state'
  | 'constructionTypes'
  | 'address'
  | 'status'
>;

export type CreateTeamMemberType = Omit<
  IBidManagementProjectTeamMember,
  '_id' | 'createdAt' | 'updatedAt' | 'user'
>;

class BidManagementService extends HttpService {
  private readonly prefix: string = 'api/bids';

  httpCreateBidPostProject = (
    data: CreateOwnerPostProjectType
  ): Promise<IResponseInterface<{ createdProject: IBidManagement }>> =>
    this.post(`${this.prefix}/create-project`, data);

  httpGetBidProjectInvitedUsers = (): Promise<
    IResponseInterface<{ projects: IBidManagement[] }>
  > => this.get(`${this.prefix}/invited-projects`);

  httpUpdateBidPostProject = (
    projectId: string,
    data: Partial<IBidManagement>
  ): Promise<IResponseInterface<{ updatedProject: IBidManagement }>> =>
    this.put(`${this.prefix}/update-project/${projectId}`, data);

  httpCreateTeamDesignMember = (
    data: CreateTeamMemberType
  ): Promise<IResponseInterface<{ user: IBidManagementProjectTeamMember }>> =>
    this.post(`${this.prefix}/create-team-member`, data);

  httpUpdateTeamDesignMember = (
    data: Partial<CreateTeamMemberType & { userId: string }>
  ): Promise<
    IResponseInterface<{ updatedUser: IBidManagementProjectTeamMember }>
  > => this.put(`${this.prefix}/update-team-member`, data);

  httpDeleteTeamDesignMember = (
    userId: string
  ): Promise<
    IResponseInterface<{ deletedUser: IBidManagementProjectTeamMember }>
  > => this.delete(`${this.prefix}/delete-team-member/${userId}`);

  httpGetOwnerProjectById = (
    projectId: string
  ): Promise<IResponseInterface<{ project: IBidManagement }>> =>
    this.get(`${this.prefix}/project-detail/${projectId}`);

  httpGetOwnerProjects = (): Promise<
    IResponseInterface<{ projects: IBidManagement[] }>
  > => this.get(`${this.prefix}/get-all`);

  httpUploadCSVFile(data: FormData): Promise<{ data: string[][] }> {
    return this.post(`${this.prefix}/import-invited-members`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export const bidManagementService = new BidManagementService();
