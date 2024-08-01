
import { ToolState } from '@/app/(pages)/contracts/types';
import { FileInterface } from '../file.interface';
import { IUserInterface } from '../user.interface';

export type CrmContractStatusType = 'pending' | 'signed' | 'draft' | 'archive';
type ContractPartyType = {
  companyName: string;
  email: string;
  name: string;
  tools: ToolState[];
  color: string;
  _id?: string;
}

export interface ICrmContract {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: CrmContractStatusType;
  file: FileInterface;
  user: string | IUserInterface;
  projectName: string;
  projectNo: string;
  senders: ContractPartyType[];
  receivers: ContractPartyType[];
}
