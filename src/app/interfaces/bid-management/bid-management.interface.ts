import { ITrade } from '../trade.interface';
import { IUserInterface } from '../user.interface';

export interface IBidManagement {
  user: string | IUserInterface;
  projectName: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  constructionTypes: string[];
  projectType: string[];
  projectBuildingUse: string[];
  stage: string;
  estimatedStartDate: string;
  bidDueDate: string;
  estimatedCompletionDate: string;
  squareFootage: string;
  projectValue: number;
  estimatedDuration: string;
  durationType: 'days' | 'years' | 'months';
  description: string;
  specialInstructions: string;
  teamMembers: IBidManagementProjectTeamMember[];
  selectedTrades: ITrade[] | string[];
  projectFiles: {
    url: string;
    extension: string;
    type: string;
    name: string;
  }[];
  selectedTeamMembers: string[];
  status: 'draft' | 'expired' | 'active' | 'archived' | 'bid closed';
  _id: string;
  createdAt: string;
  updatedAt: string;

  platformType: 'Public' | 'Private';
  isMatchingWithTrades: boolean;
  invitedMembers: string[];
  biddingTeam?: any | any[];
  invitedMembersAssets: {
    name: string;
    url: string;
    extension: string;
    type: string;
  }[];
}

export interface IBidManagementProjectTeamMember {
  user: string;
  name: string;
  role: string;
  companyName: string;
  location: string;
  phoneNumber: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISaveUserBid {
  user: string;
  projectId: string;
  status: string;
  companyName: string;
  isFavourite: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserBid {
  projectId: string;
  isFavourite?: boolean
  status?: string;
}

export interface IGetSavedUserBid {
  page: number;
  limit: number;
  status?: string;
}

export interface IBidActivity {
  _id: string;
  user: string | IUserInterface;
  projectId: string | IBidManagement;
  status: string;
  createdAt: string;
  updatedAt: string;
}