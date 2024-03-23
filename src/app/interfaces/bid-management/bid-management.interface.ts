export interface IBidManagemenet {
    user: string
    projectName: string
    address: string
    zipCode: string
    city: string
    state: string
    constructionTypes: string[]
    projectType: string[]
    projectBuildingUse: string[]
    durationType: "days" | "years" | "months"
    bidsUsers: IBidManagemenetUser[]
    selectedTrades: IBidManagemenetTrade[]
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

export interface IBidManagemenetTrade {
    _id: string
    user: string
    tradeCategoryId: IBidManagemenetTradeCategoryId
    name: string
    createdAt: string
    updatedAt: string
}

export interface IBidManagemenetTradeCategoryId {
    _id: string
    user: string
    name: string
    createdAt: string
    updatedAt: string
}

export interface IBidManagemenetUser {
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