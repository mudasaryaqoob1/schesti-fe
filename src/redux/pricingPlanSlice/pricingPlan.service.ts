// Importing base class
import { HttpService } from '@/app/services/base.service';

// Importing interfaces
import { IResponseInterface } from '@/app/interfaces/api-response.interface';

class PricingPlanService extends HttpService {
    private readonly pricingPlanPrefix: string = 'api/pricingPlan';

    httpGetPricingPlans = (
        page: number,
        limit: number = 9,
    ): Promise<IResponseInterface<any>> =>
        this.get(
            `${this.pricingPlanPrefix}/get-pricing-plans?page=${page}&limit=${limit}`
        );

}
export const pricingPlanService = new PricingPlanService();
