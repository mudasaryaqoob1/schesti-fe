import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";

type PostProjectInitialStateType = {
    project: IBidManagement | null;
    formStep: number;
}


export const postProjectInitialState: PostProjectInitialStateType = {
    formStep: 0,
    project: null
}