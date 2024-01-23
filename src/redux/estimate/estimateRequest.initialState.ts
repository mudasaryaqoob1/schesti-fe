interface IEstimateRequests {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
  generateEstimateDetail: { estimateIdDetail: Object; estimateScope: Object[] };
  estimateSummary: any;
}

const initialEstimateRequestState: IEstimateRequests = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
  estimateSummary: null,
  generateEstimateDetail: { estimateIdDetail: {}, estimateScope: [] },
};

export default initialEstimateRequestState;
