// auth.service.ts

// Importing base class
import { HttpService } from '@/app/services/base.service';

// Importing interfaces
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IUser } from '../interfaces/companyEmployeeInterfaces/user.interface';
import { ILogInInterface } from '@/app/interfaces/authInterfaces/login.interface';
import { ILoginWithGoogle } from '@/app/interfaces/authInterfaces/loginWithGoogle.interface';
import { ISignUpInterface } from '@/app/interfaces/authInterfaces/signup.interface';
import { IRegisterCompany } from '../interfaces/companyInterfaces/companyRegister.interface';
import { IForgotPasswordInterface } from '../interfaces/authInterfaces/forgotPassword.interface';
import { IResetPasswordInterface } from '../interfaces/authInterfaces/resetPassword.interface';
import { IPaymentProps } from '../interfaces/authInterfaces/payment.interface';

class AuthService extends HttpService {
  private readonly prefix: string = 'api/auth';

  httpResetPasswordHandler = (
    data: IResetPasswordInterface
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/reset-password`, data);

  httpForgotPassword = (
    data: IForgotPasswordInterface
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/forgot-password`, data);

  httpResendForgotPasswordEmail = (
    data: IForgotPasswordInterface
  ): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/resend-forgot-password-email`, data);

  addCompanyDetailHandler = (
    data: IRegisterCompany
  ): Promise<
    IResponseInterface<{ user: any; token: string; message: string }>
  > => this.post(`${this.prefix}/add-company-detail`, data);

  signupHandler = (data: ISignUpInterface): Promise<IResponseInterface<any>> =>
    this.post(`${this.prefix}/signup`, data);

  loginHandler = (
    data: ILogInInterface
  ): Promise<
    IResponseInterface<{ token: string; user: IUser; message: string }>
  > => this.post(`${this.prefix}/login`, data);

  httpLoginWithGoogleHandler = (
    data: ILoginWithGoogle
  ): Promise<
    IResponseInterface<{
      token: string;
      user: IUser;
      message: string;
      statusCode: number;
    }>
  > => this.post(`${this.prefix}/auth-with-google`, data);

  httpStripeCheckout = (
    data: IPaymentProps
  ): Promise<
    IResponseInterface<{
      status: number;
      msg: string;
      data: any;
    }>
  > => this.post(`${this.prefix}/stripe-checkout`, data);

  httpStripeInvoices = (): Promise<IResponseInterface<any>> =>
    this.get(`${this.prefix}/stripe-invoices`);

  httpPaypalCreateOrder = (
    data: IPaymentProps
  ): Promise<
    IResponseInterface<{
      status: number;
      msg: string;
      data: any;
    }>
  > => this.post(`${this.prefix}/create-order`, data);

  httpPaypalCaptureOrder = (
    orderID: string
  ): Promise<
    IResponseInterface<{
      status: number;
      msg: string;
      data: any;
    }>
  > => this.post(`${this.prefix}/capture-order`, { orderID: orderID });
}
export const authService = new AuthService();
