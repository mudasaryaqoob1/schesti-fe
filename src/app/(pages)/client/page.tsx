'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import Button from '@/app/component/customButton/button';
import Table from '../../component/table/clients/index';
import { useRouter } from 'next/navigation';
import Pagination from '../../component/pagination';
import { clientHeading } from './data';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import { useDispatch, useSelector } from 'react-redux';
// module imports
import { AppDispatch } from '@/redux/store';
import { fetchedClients } from '@/redux/clientSlice/client.thunk';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import CustomNavbar from '@/app/component/customNavbar';

const Client = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [clientsData, setClientsData] = useState(null);

  useEffect(() => {
    (async () => {
      let result: any = await dispatch(fetchedClients({ page: 1, limit: 10 }));
      setClientsData(result.payload.data);
    })();
  }, []);

  return (
    <CustomNavbar>
      <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
        <div
          className={`${bg_style} p-5 border border-solid border-silverGray`}
        >
          <div className="flex justify-between items-center">
            <TertiaryHeading
              title="Client List"
              className="text-graphiteGray"
            />
            <Button
              text="Add New client"
              className="!w-auto "
              icon="plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push('/client/create')}
            />
          </div>
          <Table headings={clientHeading} clients={clientsData} />
          <Pagination />
        </div>
      </section>
    </CustomNavbar>
  );
};

export default Client;
