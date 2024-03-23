import { IBidManagemenet } from "@/app/interfaces/bid-management/bid-management.interface";

type BidManageInitialSliceState = {
    loading: boolean;
    data: IBidManagemenet[],
    drafts: IBidManagemenet[],
    error: string;
    statusCode?: number;
}


export const bidManagementInitialState: BidManageInitialSliceState = {

    data: [],
    drafts: [],
    error: '',
    loading: false,
    statusCode: undefined
}