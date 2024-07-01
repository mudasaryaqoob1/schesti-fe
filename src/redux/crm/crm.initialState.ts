import { ICrmItem } from "@/app/interfaces/crm/crm.interface";

type State = {
    loading: boolean;
    error?: string;
    data: ICrmItem[];
}

export const crmInitialState: State = {
    loading: false,
    error: undefined,
    data: [],
}