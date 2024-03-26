import { ITrade } from "../trade.interface"

export interface IBidManagement {
    user: string
    projectName: string
    address: string
    zipCode: string
    city: string
    state: string;
    country: string;
    constructionTypes: string[];
    projectType: string[]
    projectBuildingUse: string[];
    stage: string;
    estimatedStartDate: string;
    estimatedDuration: string;
    durationType: "days" | "years" | "months";
    description: string;
    instruction: string;
    teamMembers: IBidManagementProjectTeamMember[]
    selectedTrades: ITrade[] | string[];
    projectFiles: {
        url: string;
        extension: string;
        type: string;
    }[]
    selectedTeamMemberes: string[]
    status: "draft" | 'expired' | 'active' | 'archived'
    _id: string
    createdAt: string
    updatedAt: string
}


export interface IBidManagementProjectTeamMember {
    user: string
    name: string
    role: string
    companyName: string
    location: string
    phoneNumber: string
    email: string
    _id: string
    createdAt: string
    updatedAt: string
}