// auth.service.ts

// Importing base class
import { HttpService } from '@/app/services/base.service';

// Importing interfaces
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IUser } from '../interfaces/user.interface';
import { ILogInInterface } from '@/app/interfaces/login.interface';
import { ISignUpInterface } from '@/app/interfaces/signup.interface';

import { IToken } from '@/app/interfaces/token.interface';
import { ICompanyDetailInterface } from '../interfaces/addCompanyDetail.interface';
import { IForgotPasswordInterface } from '../interfaces/forgotPassword.interface';
import { IResetPasswordInterface } from '../interfaces/resetPassword.interface';

class AuthService extends HttpService {
  private readonly prefix: string = 'api/auth';

  httpResetPasswordHandler = (
    data: IResetPasswordInterface
  ): Promise<IResponseInterface<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/reset-password`, data);

  httpForgotPassword = (
    data: IForgotPasswordInterface
  ): Promise<IResponseInterface<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/forgot-password`, data);

  addCompanyDetailHandle = (
    data: ICompanyDetailInterface
  ): Promise<IResponseInterface<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/add-company-detail`, data);

  signupHandler = (
    data: ISignUpInterface
  ): Promise<IResponseInterface<{ token: IToken; user: IUser }>> =>
    this.post(`${this.prefix}/signup`, data);

  loginHandler = (data: ILogInInterface): Promise<any> =>
    this.post(`${this.prefix}/login`, data);
}
export const authService = new AuthService();
