import { CrmType } from "@/app/interfaces/crm/crm.interface";

type State = {
    loading: boolean;
    error?: string;
    data: CrmType[];
}

export const crmInitialState: State = {
    loading: false,
    error: undefined,
    data: [],
}