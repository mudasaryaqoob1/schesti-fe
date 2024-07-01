import { ICrmVendor } from "@/app/interfaces/crm/vendor.interface";

type State = {
    loading: boolean;
    error?: string;
    data: ICrmVendor[];
}

export const crmInitialState: State = {
    loading: false,
    error: undefined,
    data: [],
}