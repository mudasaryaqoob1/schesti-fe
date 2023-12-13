'use client';
import { Dispatch, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { clientHeading } from './data';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import Button from '@/app/component/customButton/button';
import TertiaryHeading from '@/app/component/headings/tertiary';
import Table from '@/app/component/table/table';
import { fetchCompanyUsers } from '@/redux/userSlice/user.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

interface Props {
  setShowAddUser: Dispatch<React.SetStateAction<boolean>>;
}
const Index = ({ setShowAddUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  const data = useSelector((state: any) => state.auth);
  let companyId = data.user._id;

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      let result: any = await dispatch(fetchCompanyUsers(companyId));
      setUserData(result.payload.data);
    })();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <TertiaryHeading title="User Managements" />
        <Button
          text="Invite new user"
          className="!w-auto "
          icon="/plus.svg"
          iconwidth={20}
          iconheight={20}
          onClick={() => setShowAddUser(true)}
        />
      </div>
      <article className="bg-snowWhite rounded-2xl shadow-instentWhite py-5 px-6">
        <div
          className="rounded-lg border border-Gainsboro
                     bg-silverGray w-[464px] h-[40px] 
                      my-5 flex items-center gap-2 px-3.5 py-2.5"
        >
          <Image
            src={'/search.svg'}
            alt="search icon "
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search..."
            className="w-full h-full bg-transparent outline-none"
          />
        </div>
        <Table headings={clientHeading} clientsData={userData} />
      </article>
    </div>
  );
};

export default Index;
