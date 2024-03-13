export interface CreateTakeoffSummaryRequest {
  name: string;
  scope: number;
  createdBy: string;
  url: string;
}

export interface TakeoffSummaryResponse {
  message: string;
  statusCode: number;
  data: any; // Define more specific type based on your data structure
}
