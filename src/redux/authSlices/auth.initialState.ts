import { IUser } from '@/app/interfaces/user.interface';

interface IAuthState {
  loading: boolean;
  user?: IUser | null;
  token?: string | null;
  error?: string | null;
  message?: string | null;
}

const initialAuthState: IAuthState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  message: null,
};

export default initialAuthState;
