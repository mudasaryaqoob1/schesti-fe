export interface IEstimateRequest {
  clientName: string;
  companyName: string;
  email: string;
  phone: string | number;
  projectName: string;
  leadSource: string;
  projectValue: string;
  projectInformation: string;
  salePerson: string;
  estimator: string;
  architectureDocuments: Object[];
  otherDocuments: Object[];
}
