
interface IPricingPlanState {
  loading: boolean;
  data?: any;
  error?: string | null;
  message?: string | null;
}

const initialPricingPlanState: IPricingPlanState = {
  loading: false,
  data: null,
  error: null,
  message: null,
};

export default initialPricingPlanState;
