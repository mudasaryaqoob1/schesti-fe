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
    selectedTrades: IBidManagementProjectTrade[]
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

export interface IBidManagementProjectTrade {
    _id: string
    user: string
    tradeCategoryId: IBidManagementTradeCategoryId
    name: string
    createdAt: string
    updatedAt: string
}

export interface IBidManagementTradeCategoryId {
    _id: string
    user: string
    name: string
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