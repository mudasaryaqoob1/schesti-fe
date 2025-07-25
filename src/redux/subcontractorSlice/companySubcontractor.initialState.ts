interface ISubcontractor {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
}

const initialCompanySubcontractorState: ISubcontractor = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

export default initialCompanySubcontractorState;
