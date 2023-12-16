export interface IResponseInterface<T = any> {
  statusCode: number;
  message: string;
  data?: T;
}
