interface SettingTargetsInitialData {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
}

const initialSettingTargetsState: SettingTargetsInitialData = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

interface SettingCompanySetupInitialData {
  loading: boolean;
  error?: string | null;
  message?: string | null;
  statusCode: number | null;
  data: any;
}

export const initialCompanySetupState: SettingCompanySetupInitialData = {
  loading: false,
  error: null,
  message: null,
  data: null,
  statusCode: null,
};

export default initialSettingTargetsState;
