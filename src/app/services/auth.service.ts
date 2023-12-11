// auth.service.ts

// Importing base class
import { HttpService } from '@/app/services/base.service';

// Importing interfaces
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IUser } from '../interfaces/user.interface';
import { ILogInInterface } from '@/app/interfaces/login.interface';
import { ISignUpInterface } from '@/app/interfaces/signup.interface';

import { IToken } from '@/app/interfaces/token.interface';

class AuthService extends HttpService {
  private readonly prefix: string = 'api/auth';

  signupHandler = (
    data: ISignUpInterface
  ): Promise<IResponseInterface<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/signup`, data);

  loginHandler = (data: ILogInInterface): Promise<any> =>
    this.post(`${this.prefix}/login`, data);
}
export const authService = new AuthService();
