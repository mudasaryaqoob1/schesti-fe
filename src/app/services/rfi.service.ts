import { IResponseInterface } from "../interfaces/api-response.interface";
import { IRFI } from "../interfaces/rfi.interface";
import { HttpService } from "./base.service";


export type CreateRFIData = {
    projectId: string;
    description: string;
    type: "private" | "public";
    file?: {
        url: string;
        extension: string;
        type: string;
        name: string;
    };
}

class RfiService extends HttpService {
    private endPoint = "api/bids";

    httpCreateRFI = (data: CreateRFIData): Promise<IResponseInterface<{
        createdRFI: IRFI
    }>> => this.post(`${this.endPoint}/create-rfi`, data);

    httpGetAllProjectRFIs = (projectId: string): Promise<IResponseInterface<{
        rfis: IRFI[]
    }>> => this.get(`${this.endPoint}/all-rfi/?projectId=${projectId}`);

}

export const rfiService = new RfiService();
