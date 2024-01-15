interface IEstimateRequests {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
  generateEstimateDetail: { takeOffDetail: Object; scopeDetail: Object[] };
}

const initialEstimateRequestState: IEstimateRequests = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
  generateEstimateDetail: { takeOffDetail: {}, scopeDetail: [] },
};

export default initialEstimateRequestState;
