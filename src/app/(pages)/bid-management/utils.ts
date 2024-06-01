import { IBidActivity } from "@/app/interfaces/bid-management/bid-management.interface";
import { bidManagementService } from "@/app/services/bid-management.service";

export const Bid_How_Long_Price_Increase = [
    { label: 'Less than 1 month', value: 1 },
    { label: '1 to 3 months', value: 2 },
    { label: '3 to 6 months', value: 3 },
    { label: 'More than 6 months', value: 4 },
]

export const createProjectActivity = async (projectId: string, status: IBidActivity['status']) => {
    try {
        const data = { projectId: projectId, status };
        const res = await bidManagementService.httpCreateProjectActivity(data);
        console.log({ activities: res });

    } catch (error) { /* empty */ }
}