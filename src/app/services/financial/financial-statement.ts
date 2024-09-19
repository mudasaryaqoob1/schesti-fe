import { IResponseInterface } from "@/app/interfaces/api-response.interface";
import { HttpService } from "../base.service";

class FinancialStatementService extends HttpService {
    private readonly prefix: string = 'api/financial/statement';

    httpGetAllFinancialStatements = (start: Date, end: Date): Promise<IResponseInterface<any>> =>
        this.get(`${this.prefix}/?start=${start}&end=${end}`)

}

export default new FinancialStatementService();