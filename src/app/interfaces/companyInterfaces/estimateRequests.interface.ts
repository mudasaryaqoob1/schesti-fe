export interface IEstimateRequest {
  clientName: string;
  companyName: string;
  email: string;
  phone: string | number;
  city: string;
  projectName: string;
  leadSource: string;
  projectValue: string;
  projectInformation: string;
  salePerson: string;
  estimator: string;
  architecureDocument?: string;
  otherDocument?: string;
}
