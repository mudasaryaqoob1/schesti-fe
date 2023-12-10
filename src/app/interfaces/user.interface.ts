export type TBusinessCategory =
  | 'SERVICE_PROVIDER'
  | 'LOCAL_BUSINESS'
  | 'E_COMMERCE_STORE'
  | 'RESTAURANT_AND_CAFE'
  | 'ONLINE_AND_PHYSICAL'
  | 'ONLINE_AND_WALK_IN'
  | 'DIGITAL_PRODUCTS'
  | 'CONSULTING_AND_PROFESSIONAL_SERVICES';

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  provider?: string;
  providerId?: string;
}
