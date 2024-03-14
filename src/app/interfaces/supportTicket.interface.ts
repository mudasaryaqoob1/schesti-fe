export interface ISupportTicket {
  _id?: string;
  title: string;
  status?: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
}

export type ITicketMessage = {
  user: string;
  ticketId: string;
  message: string;
  sender: string;
  isFile: boolean;
  fileExtension: string;
  fileUrl: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
