import { IPaginationInfo } from '@/app/interfaces/paginationinfo.interface';

export interface IGetClients<T = any> {
  feeds: {
    records: T[];
    paginationInfo: IPaginationInfo;
  };
}
