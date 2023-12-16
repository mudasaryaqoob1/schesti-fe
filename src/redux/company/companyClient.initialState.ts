interface IClients {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
}

const initialCompanyClientState: IClients = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

export default initialCompanyClientState;
