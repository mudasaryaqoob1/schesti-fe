interface IEstimateRequests {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
}

const initialEstimateRequestState: IEstimateRequests = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

export default initialEstimateRequestState;
