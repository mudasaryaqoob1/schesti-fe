import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export function ClientInvoiceFooter() {
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user?.user as IUser | undefined;
  return (
    <div
      className="h-3"
      style={{
        backgroundColor: user?.brandingColor || 'rgb(127 86 217)',
      }}
    ></div>
  );
}
